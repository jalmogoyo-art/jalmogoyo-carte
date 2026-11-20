import pikepdf, re
from interp import mul, WIN
def parse_tounicode(f):
    m={}
    if '/ToUnicode' not in f: return m
    s=f.ToUnicode.read_bytes().decode('latin-1')
    for blk in re.findall(r'beginbfchar(.*?)endbfchar',s,re.S):
        for a,b in re.findall(r'<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>',blk):
            m[int(a,16)]=bytes.fromhex(b).decode('utf-16-be')
    for blk in re.findall(r'beginbfrange(.*?)endbfrange',s,re.S):
        for a,b,c in re.findall(r'<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>',blk):
            a,b=int(a,16),int(b,16); base=int(c,16)
            for i in range(a,b+1): m[i]=chr(base+i-a)
    return m
class Font:
    def __init__(s,f):
        s.cid = f.Subtype=='/Type0'
        s.tu=parse_tounicode(f)
        if s.cid:
            d=f.DescendantFonts[0]; s.dw=float(d.get('/DW',1000)); s.w={}
            W=list(d.get('/W',[])); i=0
            while i<len(W):
                a=int(W[i])
                if isinstance(W[i+1],pikepdf.Array):
                    for k,v in enumerate(W[i+1]): s.w[a+k]=float(v)
                    i+=2
                else:
                    b=int(W[i+1]); 
                    for k in range(a,b+1): s.w[k]=float(W[i+2])
                    i+=3
        else:
            s.fc=int(f.get('/FirstChar',0)); s.wl=[float(x) for x in f.get('/Widths',[])]
    def codes(s,b):
        return [b[i]<<8|b[i+1] for i in range(0,len(b),2)] if s.cid else list(b)
    def width(s,c):
        if s.cid: return s.w.get(c,s.dw)/1000
        i=c-s.fc; return s.wl[i]/1000 if 0<=i<len(s.wl) else 0.5
    def uni(s,c):
        if c in s.tu: return s.tu[c]
        return '?' if s.cid else WIN.get(c, bytes([c]).decode('latin-1'))
def runs(pdf,pageno):
    pg=pdf.pages[pageno]; fonts={k:Font(v) for k,v in pg.Resources.get('/Font',{}).items()}
    ops=pikepdf.parse_content_stream(pg)
    ctm=[1,0,0,1,0,0]; stack=[]; tm=tlm=[1,0,0,1,0,0]; font=None; size=1; tc=tw=0; th=1; tl=0; col=None; out=[]
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
        elif o in('rg','k','g','sc','scn'): col=(o,tuple(round(float(x),4) for x in a if not isinstance(x,pikepdf.Name)))
        elif o in('Tj','TJ',"'"):
            if o=="'": tlm=mul([1,0,0,1,0,-tl],tlm); tm=tlm
            items=a[0] if o=='TJ' else [a[0]]
            F=fonts[font]; m=mul(tm,ctm); x0,y0=m[4],m[5]; txt=''
            for it in items:
                if isinstance(it,pikepdf.String):
                    for c in F.codes(bytes(it)):
                        wx=(F.width(c)*size+tc+(tw if (c==32 and not F.cid) else 0))*th
                        tm=mul([1,0,0,1,wx,0],tm); txt+=F.uni(c)
                else: tm=mul([1,0,0,1,-float(it)/1000*size*th,0],tm)
            m2=mul(tm,ctm)
            out.append(dict(m=m,tf=size,tc=tc,tw=tw,th=th,items=[bytes(x) if isinstance(x,pikepdf.String) else float(x) for x in items],i=idx,x=x0,y=y0,x1=m2[4],font=font,size=round((m[0]**2+m[1]**2)**.5,2),col=col,t=txt,ctm=ctm,tm0=None))
    return ops,out,fonts
def lines(out,tol=2.5):
    L=[]
    for r in sorted(out,key=lambda r:(-r['y'],r['x'])):
        for l in L:
            if abs(l[0]['y']-r['y'])<tol and abs(l[-1]['x1']-r['x'])<60: l.append(r); break
        else: L.append([r])
    return [sorted(l,key=lambda r:r['x']) for l in L]

def esc(b): return b.replace(b'\\',b'\\\\').replace(b'(',b'\\(').replace(b')',b'\\)')
def colop(c):
    if c is None: return b''
    op,v=c; return (' '.join('%g'%x for x in v)+' '+op+' ').encode()
def emit_run(r,dy=0):
    m=list(r['m']); m[5]+=dy
    parts=b''.join((b'('+esc(x)+b')') if isinstance(x,bytes) else ('%g'%x).encode() for x in r['items'])
    return colop(r['col'])+('%s %g Tf %g Tc %g Tw %g Tz %g %g %g %g %.3f %.3f Tm '%(r['font'],r['tf'],r['tc'],r['tw'],r['th']*100,*m)).encode()+b'['+parts+b'] TJ\n'
