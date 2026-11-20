import pikepdf, io
from fontTools.cffLib import CFFFontSet
WIN = {0x80:'€',0x91:'‘',0x92:'’',0x95:'•',0x96:'–',0x9c:'œ'}
def dec(b):
    return ''.join(WIN.get(c, bytes([c]).decode('latin-1')) for c in b)
class W:
    def __init__(s,f):
        s.fc=int(f.get('/FirstChar',0)); s.w=[float(x) for x in f.get('/Widths',[])]
    def width(s,c):
        i=c-s.fc
        return s.w[i]/1000 if 0<=i<len(s.w) else 0.5
def mul(a,b):
    return [a[0]*b[0]+a[1]*b[2], a[0]*b[1]+a[1]*b[3], a[2]*b[0]+a[3]*b[2], a[2]*b[1]+a[3]*b[3], a[4]*b[0]+a[5]*b[2]+b[4], a[4]*b[1]+a[5]*b[3]+b[5]]
def runs(pdf, pageno):
    pg=pdf.pages[pageno]; fonts={k:W(v) for k,v in pg.Resources.get('/Font',{}).items()}
    ops=pikepdf.parse_content_stream(pg)
    ctm=[1,0,0,1,0,0]; stack=[]; tm=tlm=[1,0,0,1,0,0]; font=None; size=1; tc=tw=0; th=1; tl=0; rise=0; col=None
    out=[]
    for idx,(a,op) in enumerate(ops):
        o=str(op)
        if o=='q': stack.append((ctm,col))
        elif o=='Q': ctm,col=stack.pop()
        elif o=='cm': ctm=mul([float(x) for x in a],ctm)
        elif o=='BT': tm=tlm=[1,0,0,1,0,0]
        elif o=='Tm': tm=tlm=[float(x) for x in a]
        elif o in('Td','TD'):
            tlm=mul([1,0,0,1,float(a[0]),float(a[1])],tlm); tm=tlm
            if o=='TD': tl=-float(a[1])
        elif o=='T*': tlm=mul([1,0,0,1,0,-tl],tlm); tm=tlm
        elif o=='TL': tl=float(a[0])
        elif o=='Tf': font=str(a[0]); size=float(a[1])
        elif o=='Tc': tc=float(a[0])
        elif o=='Tw': tw=float(a[0])
        elif o=='Tz': th=float(a[0])/100
        elif o=='Ts': rise=float(a[0])
        elif o in('rg','k','g','sc','scn'): col=tuple(round(float(x),3) for x in a if not isinstance(x,pikepdf.Name))
        elif o in('Tj','TJ',"'"):
            if o=="'": tlm=mul([1,0,0,1,0,-tl],tlm); tm=tlm
            items=a[0] if o=='TJ' else [a[0]]
            m=mul(tm,ctm); x0,y0=m[4],m[5]; txt=''
            for it in items:
                if isinstance(it,pikepdf.String):
                    for c in bytes(it):
                        wx=(fonts[font].width(c)*size+tc+(tw if c==32 else 0))*th
                        tm=mul([1,0,0,1,wx,0],tm); txt+=dec(bytes([c]))
                else:
                    tm=mul([1,0,0,1,-float(it)/1000*size*th,0],tm)
            m2=mul(tm,ctm)
            out.append(dict(items=[bytes(x) if isinstance(x,pikepdf.String) else float(x) for x in items],tc=tc,tw=tw,th=th,i=idx,x=x0,y=y0,x1=m2[4],font=font,size=size*abs(m[0]) / (abs(tm[0]) or 1)*abs(tm[0]) if False else round((m[0]**2+m[1]**2)**.5,2),col=col,t=txt,rise=rise))
    return ops,out
def lines(out,tol=2.5):
    L=[]
    for r in sorted(out,key=lambda r:(-r['y'],r['x'])):
        for l in L:
            if abs(l[0]['y']-r['y'])<tol: l.append(r); break
        else: L.append([r])
    return [sorted(l,key=lambda r:r['x']) for l in L]

def esc(b):
    return b.replace(b'\\',b'\\\\').replace(b'(',b'\\(').replace(b')',b'\\)')
def colop(c):
    if c is None: return b'0 g '
    if len(c)==3: return ('%g %g %g rg '%c).encode()
    if len(c)==1: return ('%g g '%c).encode()
    return ('%g %g %g %g k '%c).encode()
def emit_run(r,dy=0,dx=0):
    parts=b''.join((b'('+esc(x)+b')') if isinstance(x,bytes) else ('%g'%x).encode() for x in r['items'])
    return colop(r['col'])+('%s %g Tf %g Tc %g Tw 1 0 0 1 %.3f %.3f Tm '%(r['font'],r['size'],r['tc'],r['tw'],r['x']+dx,r['y']+dy)).encode()+b'['+parts+b'] TJ\n'
REV={v:k for k,v in WIN.items()}
def enc(t):
    return bytes(REV.get(ch, None) or ord(ch) for ch in t) if all((ch in REV) or ord(ch)<256 for ch in t) else None
def text_op(font,size,x,y,t,col):
    b=enc(t); assert b is not None, t
    return colop(col)+('%s %g Tf 0 Tc 0 Tw 1 0 0 1 %.3f %.3f Tm '%(font,size,x,y)).encode()+b'('+esc(b)+b') Tj\n'
def twidth(pdf,pageno,font,size,t):
    f=pdf.pages[pageno].Resources.Font[font]; w=W(f)
    return sum(w.width(c) for c in enc(t))*size
