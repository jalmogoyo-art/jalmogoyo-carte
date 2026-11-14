/*
 * JALMOGOYO – menu content (same dishes and prices as the printed menu, edition "Novembre 2026").
 * To change a price or a dish, edit this file only.
 *
 * Dish fields:
 *   num     number printed on the paper menu
 *   name    romanised Korean name     ko   Korean (Hangul) name
 *   price   number in euros, or a string for several sizes
 *   img     photo in img/dishes/ (optional)
 *   spicy   0 = mild, 1 = slightly spicy, 2 = spicy
 *   veg     true = vegetarian
 *   two     true = minimum 2 persons; the price is shown "per person"
 *   al      allergens (EU list): gluten crustaceans eggs fish peanuts soy milk nuts
 *           celery mustard sesame sulphites lupin molluscs  — indicative, to be checked by the kitchen
 *   rice    true = served with a bowl of rice + "banchan" side dishes
 *   t       { fr, en, de, ko } : { title, desc }
 *
 * Category field:
 *   onlyAt  when the whole section is shown, e.g. the lunch menus:
 *           { days: [2,3,4,5], until: '14:30', noHolidays: true }
 *           days: 0 = Sunday, 1 = Monday … 6 = Saturday — times use the tablet's clock.
 *           Public holidays (Alsace-Moselle calendar, Easter etc. computed every year)
 *           are automatic — see js/schedule.js.
 */
window.MENU_DATA = {
  version: 'Novembre 2026',
  // Extra days without lunch menus (bridge day, exceptional closure…), format 'YYYY-MM-DD'.
  // Public holidays do NOT need to be listed here: they are automatic.
  closedDays: [],
  phone: '03 89 45 55 88',
  address: '41 rue de la Sinne, 68100 Mulhouse',

  categories: [
    /* ------------------------------------------------------------ */
    {
      id: 'suggestions', icon: 'star',
      t: {
        fr: { title: 'Suggestions', sub: 'Minimum requis 2 personnes · prix par personne' },
        en: { title: 'Chef’s suggestions', sub: 'Minimum 2 persons · price per person' },
        de: { title: 'Empfehlungen', sub: 'Mindestens 2 Personen · Preis pro Person' },
        ko: { title: '추천 메뉴', sub: '2인 이상 주문 · 1인 가격' }
      },
      items: [
        { id: 'bbq-assortment', al: ['gluten', 'soy', 'sesame', 'crustaceans'], num: '40', name: 'Modeum Gui', ko: '모둠 구이', price: 33, img: 'bbq-assortment', two: true, rice: true,
          t: {
            fr: { title: 'Barbecue mixte', desc: 'Assortiment à griller vous-même à table : bœuf, poulet, agneau, canard et crevettes. Le meilleur moyen de tout goûter !' },
            en: { title: 'Mixed barbecue', desc: 'A platter to grill yourself at the table: beef, chicken, lamb, duck and shrimps. The best way to taste everything!' },
            de: { title: 'Gemischtes Barbecue', desc: 'Platte zum Selbstgrillen am Tisch: Rind, Huhn, Lamm, Ente und Garnelen. Die beste Art, alles zu probieren!' },
            ko: { title: '모둠 구이', desc: '테이블에서 직접 구워 먹는 모둠: 소고기, 닭고기, 양고기, 오리고기, 새우. 모든 맛을 한 번에!' }
          } },
        { id: 'fondue', al: ['gluten', 'soy', 'sesame', 'eggs'], num: '24', name: 'Sogogi Jeongol', ko: '소고기 전골', price: 32, img: 'fondue', two: true,
          t: {
            fr: { title: 'Fondue coréenne', desc: 'Bouillon chaud à table dans lequel on cuit bœuf, chou chinois, légumes frais et nouilles coréennes. Servie avec les petits mets.' },
            en: { title: 'Korean hot pot', desc: 'Hot broth at the table to cook beef, Chinese cabbage, fresh vegetables and Korean noodles. Served with small side dishes.' },
            de: { title: 'Koreanisches Fondue', desc: 'Heiße Brühe am Tisch zum Garen von Rindfleisch, Chinakohl, frischem Gemüse und koreanischen Nudeln. Mit kleinen Beilagen.' },
            ko: { title: '한국식 전골', desc: '테이블에서 끓이는 육수에 소고기, 배추, 신선한 채소, 한국 당면을 익혀 드세요. 반찬과 함께 제공됩니다.' }
          } }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'lunch', icon: 'sun', showDesc: true,
      // Tuesday to Friday, until 14:30, never on public holidays
      onlyAt: { days: [2, 3, 4, 5], until: '14:30', noHolidays: true },
      t: {
        fr: { title: 'Menus du midi', sub: 'Du mardi au vendredi midi uniquement (hors jours fériés)' },
        en: { title: 'Lunch menus', sub: 'Tuesday to Friday, lunchtime only (not on public holidays)' },
        de: { title: 'Mittagsmenüs', sub: 'Nur Dienstag bis Freitag mittags (nicht an Feiertagen)' },
        ko: { title: '점심 메뉴', sub: '화~금 점심에만 (공휴일 제외)' }
      },
      intro: {
        fr: 'Entrée au choix : 3 raviolis grillés (poulet ou légumes) ou 3 crêpes à la ciboulette et aux fruits de mer. Chaque menu est servi avec un bol de riz nature et des petits mets.',
        en: 'Choice of starter: 3 grilled dumplings (chicken or vegetables) or 3 small seafood & chive pancakes. Each menu comes with a bowl of plain rice and small side dishes.',
        de: 'Vorspeise nach Wahl: 3 gegrillte Teigtaschen (Huhn oder Gemüse) oder 3 Pfannkuchen mit Meeresfrüchten und Schnittlauch. Jedes Menü mit einer Schale Reis und kleinen Beilagen.',
        ko: '전채 선택: 군만두 3개 (닭고기 또는 야채) 또는 해물파전 3조각. 모든 메뉴는 공기밥과 반찬이 함께 제공됩니다.'
      },
      items: [
        { id: 'lunch-a', al: ['gluten', 'soy', 'sesame'], num: 'A', name: 'Jeyuk / Dak Bokkeum', ko: '제육볶음 / 닭볶음', price: 17, img: 'jeyuk-bokkeum', spicy: 2, rice: true,
          t: {
            fr: { title: 'Menu A', desc: 'Poitrine de porc ou émincé de poulet sauté à la sauce piquante.' },
            en: { title: 'Menu A', desc: 'Stir-fried pork belly or sliced chicken in spicy sauce.' },
            de: { title: 'Menü A', desc: 'Schweinebauch oder geschnetzeltes Hähnchen in scharfer Sauce gebraten.' },
            ko: { title: 'A 메뉴', desc: '매콤한 양념에 볶은 돼지 삼겹살 또는 닭고기.' }
          } },
        { id: 'lunch-c', al: ['soy', 'gluten', 'fish', 'crustaceans'], num: 'C', name: 'Dubu Jjigae', ko: '두부찌개', price: 16, img: 'dubu-jjigae', spicy: 1, rice: true,
          t: {
            fr: { title: 'Menu C', desc: 'Ragoût de tofu.' },
            en: { title: 'Menu C', desc: 'Tofu stew.' },
            de: { title: 'Menü C', desc: 'Tofu-Eintopf.' },
            ko: { title: 'C 메뉴', desc: '두부찌개.' }
          } },
        { id: 'lunch-d', al: ['soy', 'gluten', 'sesame', 'eggs'], num: 'D', name: 'Yukgaejang', ko: '육개장', price: 18, img: 'yukgaejang', spicy: 2, rice: true,
          t: {
            fr: { title: 'Menu D', desc: 'Ragoût piquant au bœuf.' },
            en: { title: 'Menu D', desc: 'Spicy beef stew.' },
            de: { title: 'Menü D', desc: 'Scharfer Rindfleischeintopf.' },
            ko: { title: 'D 메뉴', desc: '얼큰한 소고기 육개장.' }
          } },
        { id: 'lunch-e', al: ['eggs', 'soy', 'gluten', 'sesame'], num: 'E', name: 'Dolsot Bibimbap', ko: '소고기 돌솥 비빔밥', price: 18, img: 'bibimbap-beef', rice: true,
          t: {
            fr: { title: 'Menu E', desc: 'Dolsot bibimbap au bœuf (bol en pierre chauffé).' },
            en: { title: 'Menu E', desc: 'Beef dolsot bibimbap (heated stone bowl).' },
            de: { title: 'Menü E', desc: 'Dolsot-Bibimbap mit Rindfleisch (heißer Steintopf).' },
            ko: { title: 'E 메뉴', desc: '소고기 돌솥 비빔밥.' }
          } },
        { id: 'lunch-f', al: ['fish', 'eggs', 'soy', 'gluten', 'sesame'], num: 'F', name: 'Dolsot Bibimbap', ko: '연어 돌솥 비빔밥', price: 18, img: 'bibimbap-salmon', rice: true,
          t: {
            fr: { title: 'Menu F', desc: 'Dolsot bibimbap au saumon (bol en pierre chauffé).' },
            en: { title: 'Menu F', desc: 'Salmon dolsot bibimbap (heated stone bowl).' },
            de: { title: 'Menü F', desc: 'Dolsot-Bibimbap mit Lachs (heißer Steintopf).' },
            ko: { title: 'F 메뉴', desc: '연어 돌솥 비빔밥.' }
          } },
        { id: 'lunch-g', al: ['eggs', 'soy', 'gluten', 'sesame'], num: 'G', name: 'Dolsot Bibimbap', ko: '야채 돌솥 비빔밥', price: 16, img: 'bibimbap-veg', veg: true, rice: true,
          t: {
            fr: { title: 'Menu G', desc: 'Dolsot bibimbap aux légumes (bol en pierre chauffé).' },
            en: { title: 'Menu G', desc: 'Vegetable dolsot bibimbap (heated stone bowl).' },
            de: { title: 'Menü G', desc: 'Dolsot-Bibimbap mit Gemüse (heißer Steintopf).' },
            ko: { title: 'G 메뉴', desc: '야채 돌솥 비빔밥.' }
          } }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'starters', icon: 'dumpling',
      t: {
        fr: { title: 'Les entrées' }, en: { title: 'Starters' }, de: { title: 'Vorspeisen' }, ko: { title: '전채 요리' }
      },
      items: [
        { id: 'gun-mandu', al: ['gluten', 'soy', 'sesame', 'eggs'], num: '1', name: 'Gun Mandu', ko: '군만두', price: 9, img: 'gun-mandu',
          t: {
            fr: { title: 'Raviolis grillés (6 pièces)', desc: 'Raviolis coréens dorés à la poêle, farcis au poulet et aux légumes.' },
            en: { title: 'Grilled dumplings (6 pcs)', desc: 'Pan-fried Korean dumplings filled with chicken and vegetables.' },
            de: { title: 'Gegrillte Teigtaschen (6 Stück)', desc: 'Knusprig gebratene koreanische Teigtaschen mit Hähnchen und Gemüse.' },
            ko: { title: '군만두 (6개)', desc: '닭고기와 채소로 속을 채워 노릇하게 구운 만두.' }
          } },
        { id: 'gun-mandu-v', al: ['gluten', 'soy', 'sesame'], num: '1v', name: 'Gun Mandu vegi', ko: '야채 군만두', price: 9, img: 'gun-mandu', veg: true,
          t: {
            fr: { title: 'Raviolis végétariens (6 pièces)', desc: 'Raviolis grillés farcis aux légumes.' },
            en: { title: 'Vegetarian dumplings (6 pcs)', desc: 'Pan-fried dumplings filled with vegetables.' },
            de: { title: 'Vegetarische Teigtaschen (6 Stück)', desc: 'Gebratene Teigtaschen mit Gemüsefüllung.' },
            ko: { title: '야채 군만두 (6개)', desc: '채소로 속을 채운 군만두.' }
          } },
        { id: 'haemul-pajeon', al: ['gluten', 'eggs', 'crustaceans', 'molluscs', 'soy', 'sesame'], num: '2', name: 'Haemul Pajeon', ko: '해물파전', price: 12, img: 'haemul-pajeon',
          t: {
            fr: { title: 'Crêpe aux fruits de mer', desc: 'Grande crêpe coréenne croustillante aux fruits de mer, poivron et ciboulette. À partager.' },
            en: { title: 'Seafood pancake', desc: 'Large crispy Korean pancake with seafood, pepper and chives. Good for sharing.' },
            de: { title: 'Meeresfrüchte-Pfannkuchen', desc: 'Großer knuspriger koreanischer Pfannkuchen mit Meeresfrüchten, Paprika und Schnittlauch. Zum Teilen.' },
            ko: { title: '해물파전', desc: '해물, 고추, 쪽파를 넣어 바삭하게 부친 전. 나눠 드시기 좋아요.' }
          } },
        { id: 'kimchijeon', al: ['gluten', 'eggs', 'fish', 'crustaceans', 'soy'], num: '3', name: 'Kimchi Jeon', ko: '김치전', price: 9, img: 'kimchijeon', spicy: 1,
          t: {
            fr: { title: 'Crêpe au kimchi', desc: 'Crêpe croustillante au kimchi (chou fermenté), légèrement piquante.' },
            en: { title: 'Kimchi pancake', desc: 'Crispy pancake with kimchi (fermented cabbage), slightly spicy.' },
            de: { title: 'Kimchi-Pfannkuchen', desc: 'Knuspriger Pfannkuchen mit Kimchi (fermentierter Kohl), leicht scharf.' },
            ko: { title: '김치전', desc: '김치를 넣어 바삭하게 부친 전. 약간 매콤해요.' }
          } },
        { id: 'dakgangjeong', al: ['gluten', 'soy', 'sesame', 'peanuts'], num: '4', name: 'Dakgangjeong', ko: '닭강정', price: 13, img: 'dakgangjeong',
          t: {
            fr: { title: 'Beignets de poulet aigre-doux', desc: 'Poulet frit croustillant, enrobé d’une sauce sucrée-salée façon coréenne.' },
            en: { title: 'Sweet & sour fried chicken', desc: 'Crispy fried chicken glazed with a Korean-style sweet and tangy sauce.' },
            de: { title: 'Süß-saures Backhähnchen', desc: 'Knusprig frittiertes Hähnchen in süß-saurer Sauce nach koreanischer Art.' },
            ko: { title: '닭강정', desc: '바삭하게 튀긴 닭고기에 달콤새콤한 양념을 버무렸어요.' }
          } },
        { id: 'dubu', al: ['soy', 'gluten', 'sesame'], num: '5', name: 'Dubu', ko: '두부', price: 7, img: 'dubu',
          t: {
            fr: { title: 'Tofu sauce à l’ail', desc: 'Tofu servi avec une sauce soja à l’ail.' },
            en: { title: 'Tofu with garlic sauce', desc: 'Tofu served with a garlic soy sauce.' },
            de: { title: 'Tofu mit Knoblauchsauce', desc: 'Tofu mit Knoblauch-Sojasauce.' },
            ko: { title: '두부', desc: '마늘 간장 소스를 곁들인 두부.' }
          } }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'mains', icon: 'bowl',
      t: {
        fr: { title: 'Les plats', sub: 'Servis avec un bol de riz et des petits mets (sauf vermicelles et gâteau de riz)' },
        en: { title: 'Main dishes', sub: 'Served with a bowl of rice and small side dishes (except noodles and rice cakes)' },
        de: { title: 'Hauptgerichte', sub: 'Mit einer Schale Reis und kleinen Beilagen (außer Nudeln und Reiskuchen)' },
        ko: { title: '식사 메뉴', sub: '공기밥과 반찬 제공 (잡채, 떡볶이, 짜장면 제외)' }
      },
      items: [
        { id: 'japchae', al: ['soy', 'gluten', 'sesame', 'eggs'], num: '6', name: 'Japchae', ko: '잡채', price: 17, img: 'japchae',
          t: {
            fr: { title: 'Vermicelles sautés au bœuf', desc: 'Vermicelles de patate douce sautés avec de fines lamelles de bœuf et des légumes.' },
            en: { title: 'Stir-fried glass noodles with beef', desc: 'Sweet-potato glass noodles stir-fried with thin slices of beef and vegetables.' },
            de: { title: 'Gebratene Glasnudeln mit Rind', desc: 'Süßkartoffel-Glasnudeln mit Rindfleischstreifen und Gemüse gebraten.' },
            ko: { title: '소고기 잡채', desc: '당면에 얇게 썬 소고기와 채소를 넣어 볶았어요.' }
          } },
        { id: 'japchae-v', al: ['soy', 'gluten', 'sesame'], num: '6v', name: 'Japchae', ko: '야채 잡채', price: 17, img: 'japchae', veg: true,
          t: {
            fr: { title: 'Vermicelles sautés végétariens', desc: 'Vermicelles de patate douce sautés aux légumes.' },
            en: { title: 'Vegetarian glass noodles', desc: 'Sweet-potato glass noodles stir-fried with vegetables.' },
            de: { title: 'Vegetarische Glasnudeln', desc: 'Süßkartoffel-Glasnudeln mit Gemüse gebraten.' },
            ko: { title: '야채 잡채', desc: '당면과 채소를 함께 볶았어요.' }
          } },
        { id: 'tteokbokki', al: ['gluten', 'soy', 'crustaceans', 'molluscs', 'fish'], num: '7', name: 'Haemul Tteokbokki', ko: '해물떡볶이', price: 21, img: 'tteokbokki', spicy: 2,
          t: {
            fr: { title: 'Gâteaux de riz aux fruits de mer', desc: 'Bâtonnets de riz moelleux et fruits de mer sautés à la sauce piquante.' },
            en: { title: 'Rice cakes with seafood', desc: 'Chewy rice cake sticks and seafood stir-fried in a hot, spicy sauce.' },
            de: { title: 'Reiskuchen mit Meeresfrüchten', desc: 'Weiche Reiskuchen-Stäbchen mit Meeresfrüchten in scharfer Sauce gebraten.' },
            ko: { title: '해물떡볶이', desc: '쫄깃한 떡과 해물을 매콤한 양념에 볶았어요.' }
          } },
        { id: 'ojingeo-bokkeum', al: ['molluscs', 'gluten', 'soy', 'sesame'], num: '8', name: 'Ojingeo Bokkeum', ko: '오징어볶음', price: 20, img: 'ojingeo-bokkeum', spicy: 2, rice: true,
          t: {
            fr: { title: 'Seiche sautée piquante', desc: 'Seiche sautée aux légumes dans une sauce piquante.' },
            en: { title: 'Spicy stir-fried squid', desc: 'Squid stir-fried with vegetables in a spicy sauce.' },
            de: { title: 'Scharf gebratener Tintenfisch', desc: 'Tintenfisch mit Gemüse in scharfer Sauce gebraten.' },
            ko: { title: '오징어볶음', desc: '오징어와 채소를 매콤하게 볶았어요.' }
          } },
        { id: 'kimchi', al: ['fish', 'crustaceans'], num: '9', name: 'Kimchi', ko: '김치', price: 5, img: 'kimchi', spicy: 1,
          t: {
            fr: { title: 'Kimchi', desc: 'Chou chinois fermenté au piment, l’accompagnement emblématique de la Corée.' },
            en: { title: 'Kimchi', desc: 'Fermented Chinese cabbage with chili, Korea’s iconic side dish.' },
            de: { title: 'Kimchi', desc: 'Fermentierter Chinakohl mit Chili, die berühmte koreanische Beilage.' },
            ko: { title: '김치', desc: '한국의 대표 반찬, 배추김치.' }
          } },
        { id: 'jajangmyeon', al: ['gluten', 'soy'], num: '10', name: 'Jajangmyeon', ko: '짜장면', price: 17, img: 'jajangmyeon',
          t: {
            fr: { title: 'Nouilles sauce soja noire', desc: 'Nouilles de blé nappées d’une sauce à la pâte de soja noir et au porc haché.' },
            en: { title: 'Black bean noodles', desc: 'Wheat noodles topped with a black soybean paste sauce and minced pork.' },
            de: { title: 'Nudeln mit schwarzer Bohnensauce', desc: 'Weizennudeln mit Sauce aus schwarzer Sojapaste und Schweinehackfleisch.' },
            ko: { title: '짜장면', desc: '춘장 소스와 다진 돼지고기를 얹은 면 요리.' }
          } },
        { id: 'bulgogi', al: ['soy', 'gluten', 'sesame'], num: '20', name: 'Bulgogi', ko: '불고기', price: 21, img: 'bulgogi', rice: true,
          t: {
            fr: { title: 'Bœuf mariné grillé', desc: 'Fines tranches de bœuf dans une marinade sucrée-salée, cuites sur le feu. Le grand classique, non piquant.' },
            en: { title: 'Marinated beef', desc: 'Thin slices of beef in a sweet-savoury marinade, cooked over the flame. The great classic, not spicy.' },
            de: { title: 'Mariniertes Rindfleisch', desc: 'Fein geschnittenes Rindfleisch in süß-würziger Marinade, über der Flamme gebraten. Der Klassiker, nicht scharf.' },
            ko: { title: '불고기', desc: '달콤짭짤한 양념에 재운 얇은 소고기를 불에 구웠어요. 맵지 않은 대표 메뉴.' }
          } },
        { id: 'dakgalbi', al: ['soy', 'gluten', 'sesame'], num: '21', name: 'Dakgalbi', ko: '닭갈비', price: 21, img: 'dakgalbi', spicy: 2, rice: true,
          t: {
            fr: { title: 'Poulet sauté piquant', desc: 'Cuisse de poulet émincée sautée aux champignons, sauce piquante.' },
            en: { title: 'Spicy stir-fried chicken', desc: 'Sliced chicken thigh stir-fried with button mushrooms in a spicy sauce.' },
            de: { title: 'Scharf gebratenes Hähnchen', desc: 'Geschnetzelte Hähnchenkeule mit Champignons in scharfer Sauce gebraten.' },
            ko: { title: '닭갈비', desc: '닭다리살과 양송이버섯을 매콤한 양념에 볶았어요.' }
          } },
        { id: 'jeyuk-bokkeum', al: ['soy', 'gluten', 'sesame'], num: '22', name: 'Jeyuk Bokkeum', ko: '제육볶음', price: 21, img: 'jeyuk-bokkeum', spicy: 2, rice: true,
          t: {
            fr: { title: 'Porc sauté piquant', desc: 'Poitrine de porc sautée aux champignons dans une sauce piquante.' },
            en: { title: 'Spicy stir-fried pork', desc: 'Pork belly stir-fried with button mushrooms in a hot, spicy sauce.' },
            de: { title: 'Scharf gebratenes Schwein', desc: 'Schweinebauch mit Champignons in scharfer Sauce gebraten.' },
            ko: { title: '제육볶음', desc: '돼지고기와 양송이버섯을 매콤한 양념에 볶았어요.' }
          } }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'bbq', icon: 'fire',
      t: {
        fr: { title: 'Les barbecues', sub: 'Grillés à votre table · minimum 2 personnes par table · prix par personne · servis avec riz et petits mets' },
        en: { title: 'Korean barbecue', sub: 'Grilled at your table · minimum 2 persons per table · price per person · served with rice and side dishes' },
        de: { title: 'Koreanisches Barbecue', sub: 'Am Tisch gegrillt · mindestens 2 Personen pro Tisch · Preis pro Person · mit Reis und Beilagen' },
        ko: { title: '바비큐', sub: '테이블에서 직접 구이 · 테이블당 최소 2인 · 1인 가격 · 공기밥과 반찬 제공' }
      },
      intro: {
        fr: 'Comment ça marche ? La viande est grillée sur le barbecue au centre de votre table. Enveloppez une bouchée dans une feuille de salade avec un peu de sauce et de petits mets, puis dégustez en une fois !',
        en: 'How does it work? The meat is grilled on the barbecue in the middle of your table. Wrap a bite in a lettuce leaf with a little sauce and side dishes, then eat it in one go!',
        de: 'Wie funktioniert es? Das Fleisch wird auf dem Grill in der Mitte Ihres Tisches gegrillt. Wickeln Sie einen Bissen mit etwas Sauce und Beilagen in ein Salatblatt und genießen Sie ihn in einem Happen!',
        ko: '테이블 가운데 그릴에서 고기를 구워 드세요. 상추에 고기와 쌈장, 반찬을 올려 한입에 쌈을 즐겨보세요!'
      },
      items: [
        { id: 'bbq-beef', al: ['soy', 'gluten', 'sesame'], num: '23', name: 'So Deungsim', ko: '소고기 등심', price: 24, img: 'bbq-beef', two: true, rice: true,
          t: {
            fr: { title: 'Barbecue bœuf (noix de basse côte)', desc: 'Noix de basse côte de bœuf à griller à table.' },
            en: { title: 'Beef barbecue (chuck eye)', desc: 'Beef chuck eye to grill at your table.' },
            de: { title: 'Rindfleisch-Barbecue (Fehlrippe)', desc: 'Rinder-Fehlrippe zum Grillen am Tisch.' },
            ko: { title: '소고기 등심 구이', desc: '테이블에서 구워 먹는 소고기 등심.' }
          } },
        { id: 'bbq-lamb', al: ['soy', 'gluten', 'sesame'], num: '26', name: 'Yang Gogi', ko: '양고기 구이', price: 24, img: 'bbq-lamb', two: true, rice: true,
          t: {
            fr: { title: 'Barbecue agneau', desc: 'Agneau mariné à griller à table.' },
            en: { title: 'Lamb barbecue', desc: 'Marinated lamb to grill at your table.' },
            de: { title: 'Lamm-Barbecue', desc: 'Mariniertes Lammfleisch zum Grillen am Tisch.' },
            ko: { title: '양고기 구이', desc: '테이블에서 구워 먹는 양념 양고기.' }
          } },
        { id: 'bbq-pork', al: ['soy', 'gluten', 'sesame'], num: '27', name: 'Dwaeji Gogi', ko: '돼지고기 구이', price: 21, img: 'bbq-pork', two: true, rice: true,
          t: {
            fr: { title: 'Barbecue porc', desc: 'Porc mariné à griller à table.' },
            en: { title: 'Pork barbecue', desc: 'Marinated pork to grill at your table.' },
            de: { title: 'Schweinefleisch-Barbecue', desc: 'Mariniertes Schweinefleisch zum Grillen am Tisch.' },
            ko: { title: '돼지고기 구이', desc: '테이블에서 구워 먹는 양념 돼지고기.' }
          } },
        { id: 'samgyeopsal', al: ['sesame', 'soy', 'gluten'], num: '28', name: 'Samgyeopsal', ko: '삼겹살', price: 22, img: 'samgyeopsal', two: true, rice: true,
          t: {
            fr: { title: 'Poitrine de porc grillée', desc: 'Tranches épaisses de poitrine de porc nature, le barbecue préféré des Coréens.' },
            en: { title: 'Grilled pork belly', desc: 'Thick slices of plain pork belly, Korea’s favourite barbecue.' },
            de: { title: 'Gegrillter Schweinebauch', desc: 'Dicke Scheiben Schweinebauch natur, das Lieblings-Barbecue der Koreaner.' },
            ko: { title: '삼겹살', desc: '한국인이 가장 사랑하는 바비큐, 두툼한 삼겹살.' }
          } },
        { id: 'bbq-duck', al: ['soy', 'gluten', 'sesame'], num: '29', name: 'Ori Gogi', ko: '오리 가슴살 구이', price: 25, img: 'bbq-duck', two: true, rice: true,
          t: {
            fr: { title: 'Barbecue magret de canard', desc: 'Magret de canard en tranches à griller à table.' },
            en: { title: 'Duck breast barbecue', desc: 'Sliced duck breast to grill at your table.' },
            de: { title: 'Entenbrust-Barbecue', desc: 'Entenbrust in Scheiben zum Grillen am Tisch.' },
            ko: { title: '오리 가슴살 구이', desc: '테이블에서 구워 먹는 오리 가슴살.' }
          } },
        { id: 'bbq-shrimp', al: ['crustaceans', 'sesame', 'soy', 'gluten'], num: '30', name: 'Saeu Gui', ko: '새우 구이', price: 26, img: 'bbq-shrimp', two: true, rice: true,
          t: {
            fr: { title: 'Barbecue de crevettes (10–12 pièces)', desc: 'Crevettes à griller à table.' },
            en: { title: 'Shrimp barbecue (10–12 pcs)', desc: 'Shrimps to grill at your table.' },
            de: { title: 'Garnelen-Barbecue (10–12 Stück)', desc: 'Garnelen zum Grillen am Tisch.' },
            ko: { title: '새우 구이 (10~12마리)', desc: '테이블에서 구워 먹는 새우.' }
          } },
        { id: 'bbq-chicken', al: ['soy', 'gluten', 'sesame'], num: '31', name: 'Dak Gui', ko: '닭고기 구이', price: 22, img: 'bbq-chicken', two: true, rice: true,
          t: {
            fr: { title: 'Barbecue poulet (cuisse)', desc: 'Cuisse de poulet marinée à griller à table.' },
            en: { title: 'Chicken barbecue (thigh)', desc: 'Marinated chicken thigh to grill at your table.' },
            de: { title: 'Hähnchen-Barbecue (Keule)', desc: 'Marinierte Hähnchenkeule zum Grillen am Tisch.' },
            ko: { title: '닭고기 구이 (닭다리살)', desc: '테이블에서 구워 먹는 양념 닭다리살.' }
          } }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'bibimbap', icon: 'stone',
      t: {
        fr: { title: 'Dolsot bibimbap', sub: 'Servis dans un bol en pierre chauffé (dolsot, 돌솥)' },
        en: { title: 'Dolsot bibimbap', sub: 'Served in a heated stone bowl (dolsot, 돌솥)' },
        de: { title: 'Dolsot-Bibimbap', sub: 'Im heißen Steintopf serviert (Dolsot, 돌솥)' },
        ko: { title: '돌솥 비빔밥', sub: '뜨거운 돌솥에 제공됩니다' }
      },
      intro: {
        fr: 'Le dolsot bibimbap : « dolsot » désigne le bol en pierre, « bibimbap » le riz mélangé. Du riz garni de légumes et d’un ingrédient au choix. Ajoutez la sauce pimentée selon votre goût et mélangez bien. Le bol est brûlant : le riz devient croustillant au fond !',
        en: 'Dolsot bibimbap: “dolsot” is the stone bowl, “bibimbap” means mixed rice. Rice topped with vegetables and your choice of topping. Add chili paste to taste and mix well. The bowl is very hot: the rice turns crispy at the bottom!',
        de: 'Dolsot-Bibimbap: „Dolsot“ ist der Steintopf, „Bibimbap“ bedeutet gemischter Reis. Reis mit Gemüse und einer Zutat nach Wahl. Chilipaste nach Geschmack dazugeben und gut mischen. Der Topf ist sehr heiß: Der Reis wird unten knusprig!',
        ko: '돌솥 비빔밥: 밥 위에 나물과 재료를 올렸어요. 고추장을 취향껏 넣고 잘 비벼 드세요. 돌솥이 뜨거우니 조심하세요. 바닥의 누룽지도 별미예요!'
      },
      items: [
        { id: 'bibimbap-seafood', al: ['crustaceans', 'molluscs', 'eggs', 'soy', 'gluten', 'sesame'], num: '32', name: 'Haemul Dolsot Bibimbap', ko: '해물 돌솥 비빔밥', price: 23, img: 'bibimbap-seafood',
          t: {
            fr: { title: 'Dolsot bibimbap aux fruits de mer', desc: 'Riz, légumes et fruits de mer dans un bol de pierre chaude.' },
            en: { title: 'Seafood dolsot bibimbap', desc: 'Rice, vegetables and seafood in a hot stone bowl.' },
            de: { title: 'Dolsot-Bibimbap mit Meeresfrüchten', desc: 'Reis, Gemüse und Meeresfrüchte im heißen Steintopf.' },
            ko: { title: '해물 돌솥 비빔밥', desc: '밥, 나물, 해물을 뜨거운 돌솥에 담았어요.' }
          } },
        { id: 'bibimbap-beef', al: ['eggs', 'soy', 'gluten', 'sesame'], num: '33', name: 'Sogogi Dolsot Bibimbap', ko: '소고기 돌솥 비빔밥', price: 22, img: 'bibimbap-beef',
          t: {
            fr: { title: 'Dolsot bibimbap au bœuf', desc: 'Riz, légumes et bœuf dans un bol de pierre chaude.' },
            en: { title: 'Beef dolsot bibimbap', desc: 'Rice, vegetables and beef in a hot stone bowl.' },
            de: { title: 'Dolsot-Bibimbap mit Rindfleisch', desc: 'Reis, Gemüse und Rindfleisch im heißen Steintopf.' },
            ko: { title: '소고기 돌솥 비빔밥', desc: '밥, 나물, 소고기를 뜨거운 돌솥에 담았어요.' }
          } },
        { id: 'bibimbap-salmon', al: ['fish', 'eggs', 'soy', 'gluten', 'sesame'], num: '34', name: 'Yeoneo Dolsot Bibimbap', ko: '연어 돌솥 비빔밥', price: 22, img: 'bibimbap-salmon',
          t: {
            fr: { title: 'Dolsot bibimbap au saumon', desc: 'Riz, légumes et saumon dans un bol de pierre chaude.' },
            en: { title: 'Salmon dolsot bibimbap', desc: 'Rice, vegetables and salmon in a hot stone bowl.' },
            de: { title: 'Dolsot-Bibimbap mit Lachs', desc: 'Reis, Gemüse und Lachs im heißen Steintopf.' },
            ko: { title: '연어 돌솥 비빔밥', desc: '밥, 나물, 연어를 뜨거운 돌솥에 담았어요.' }
          } },
        { id: 'bibimbap-veg', al: ['eggs', 'soy', 'gluten', 'sesame'], num: '35', name: 'Yachae Dolsot Bibimbap', ko: '야채 돌솥 비빔밥', price: 17, img: 'bibimbap-veg', veg: true,
          t: {
            fr: { title: 'Dolsot bibimbap végétarien', desc: 'Riz et mélange de légumes de saison dans un bol de pierre chaude.' },
            en: { title: 'Vegetarian dolsot bibimbap', desc: 'Rice and mixed seasonal vegetables in a hot stone bowl.' },
            de: { title: 'Vegetarisches Dolsot-Bibimbap', desc: 'Reis und Gemüse der Saison im heißen Steintopf.' },
            ko: { title: '야채 돌솥 비빔밥', desc: '밥과 제철 채소를 뜨거운 돌솥에 담았어요.' }
          } }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'stews', icon: 'pot',
      t: {
        fr: { title: 'Les ragoûts', sub: 'Servis bouillants avec un bol de riz et des petits mets' },
        en: { title: 'Stews', sub: 'Served boiling hot with a bowl of rice and side dishes' },
        de: { title: 'Eintöpfe', sub: 'Kochend heiß serviert, mit Reis und Beilagen' },
        ko: { title: '찌개 · 탕', sub: '공기밥과 반찬이 함께 제공됩니다' }
      },
      items: [
        { id: 'dubu-jjigae', al: ['soy', 'gluten', 'fish', 'crustaceans'], num: '37', name: 'Dubu Jjigae', ko: '두부찌개', price: 18, img: 'dubu-jjigae', spicy: 2, rice: true,
          t: {
            fr: { title: 'Ragoût de tofu piquant', desc: 'Ragoût au tofu dans un bouillon relevé au piment.' },
            en: { title: 'Spicy tofu stew', desc: 'Tofu stew in a chili-spiced broth.' },
            de: { title: 'Scharfer Tofu-Eintopf', desc: 'Tofu-Eintopf in einer würzigen Chilibrühe.' },
            ko: { title: '두부찌개', desc: '얼큰한 국물에 두부를 넣고 끓인 찌개.' }
          } },
        { id: 'yukgaejang', al: ['soy', 'gluten', 'sesame', 'eggs'], num: '38', name: 'Yukgaejang', ko: '육개장', price: 21, img: 'yukgaejang', spicy: 2, rice: true,
          t: {
            fr: { title: 'Ragoût de bœuf piquant', desc: 'Soupe-ragoût de bœuf effiloché et légumes, bien relevée.' },
            en: { title: 'Spicy beef stew', desc: 'Hearty stew of shredded beef and vegetables in a spicy broth.' },
            de: { title: 'Scharfer Rindfleisch-Eintopf', desc: 'Herzhafter Eintopf mit gezupftem Rindfleisch und Gemüse in scharfer Brühe.' },
            ko: { title: '육개장', desc: '결대로 찢은 소고기와 채소를 얼큰하게 끓였어요.' }
          } }
      ]
    },

    /* ------------------------------------------------------------ */
    /* Desserts: no number on the paper menu (noNum). Source: Tasty Cloud card, November 2026. */
    {
      id: 'desserts', icon: 'icecream', noNum: true,
      t: {
        fr: { title: 'Les desserts' }, en: { title: 'Desserts' }, de: { title: 'Desserts' }, ko: { title: '디저트' }
      },
      items: [
        { id: 'ds-mango', img: 'dessert-mango', al: ['eggs', 'milk', 'peanuts', 'sesame'], name: 'Flocons mangue', ko: '망고 빙수', price: 9.5,
          t: {
            fr: { title: 'Flocons glacés à la mangue', desc: 'Préparation « minute ». Flocons glacés à base de jus de mangue, sorbet mangue et assortiment de fruits frais.' },
            en: { title: 'Mango shaved ice', desc: 'Made to order. Ice flakes made with mango juice, mango sorbet and assorted fresh fruit.' },
            de: { title: 'Mango-Eisflocken', desc: 'Frisch zubereitet. Eisflocken aus Mangosaft, Mangosorbet und frische Früchte.' },
            ko: { title: '망고 빙수', desc: '주문 즉시 만듭니다. 망고 주스 얼음 플레이크, 망고 셔벗, 신선한 과일.' }
          } },
        { id: 'ds-mochi', img: 'dessert-mochi', al: ['gluten', 'milk'], name: 'Mochi glacé', ko: '모찌 아이스크림', price: '3,50 / 7 / 10',
          t: {
            fr: { title: '1, 2 ou 3 pièces', desc: 'Demi-boule de glace enveloppée dans de la pâte de riz gluant.' },
            en: { title: 'Ice-cream mochi · 1, 2 or 3 pieces', desc: 'Half a scoop of ice cream wrapped in soft glutinous rice dough.' },
            de: { title: 'Eis-Mochi · 1, 2 oder 3 Stück', desc: 'Eine halbe Kugel Eis, umhüllt von weichem Klebreisteig.' },
            ko: { title: '1개 · 2개 · 3개', desc: '쫀득한 찹쌀떡으로 감싼 아이스크림.' }
          } },
        { id: 'ds-nougat', img: 'dessert-nougat', al: ['milk', 'sesame', 'gluten', 'nuts', 'peanuts', 'eggs'], name: 'Nougat glacé', ko: '누가 글라세', price: 7,
          t: {
            fr: { title: 'Dessert glacé au nougat', desc: '' },
            en: { title: 'Iced nougat parfait', desc: '' },
            de: { title: 'Nougat-Eisparfait', desc: '' },
            ko: { title: '누가 아이스 디저트', desc: '' }
          } },
        { id: 'ds-vacherin', img: 'dessert-vacherin', al: ['milk', 'sesame', 'gluten', 'nuts', 'peanuts', 'eggs'], name: 'Vacherin glacé framboise', ko: '라즈베리 바슈랭 글라세', price: 7,
          t: {
            fr: { title: 'Dessert glacé meringué à la framboise', desc: '' },
            en: { title: 'Raspberry ice-cream meringue cake', desc: '' },
            de: { title: 'Himbeer-Eistorte mit Baiser', desc: '' },
            ko: { title: '라즈베리 머랭 아이스 케이크', desc: '' }
          } },
        { id: 'ds-glaces', img: 'dessert-ice-cream', al: ['milk'], name: 'Glaces', ko: '아이스크림', price: '2,80 / 5,50 / 7,50',
          t: {
            fr: { title: '1, 2 ou 3 boules', desc: '' },
            en: { title: 'Ice cream · 1, 2 or 3 scoops', desc: '' },
            de: { title: 'Eis · 1, 2 oder 3 Kugeln', desc: '' },
            ko: { title: '1 · 2 · 3 스쿱', desc: '' }
          } },
        { id: 'ds-irish', al: ['milk'], name: 'Irish coffee', ko: '아이리시 커피', price: 8.5,
          t: {
            fr: { title: 'Café, whiskey et crème', desc: '' },
            en: { title: 'Coffee, whiskey and cream', desc: '' },
            de: { title: 'Kaffee, Whiskey und Sahne', desc: '' },
            ko: { title: '커피, 위스키, 크림', desc: '' }
          } }
      ]
    },

    /* ------------------------------------------------------------ */
    /* Drinks: one section, with a row of buttons (groups) to switch between families.
     * Item fields: group (one of groups[].id), sub (sub-heading inside a group, e.g. wine colour),
     *   size + price ("25 cl / 50 cl" + "3,50 / 6,80" for two sizes), or sizes: [['12 cl', 6.5], …]
     *   year (vintage), bio: true (organic), korean: true (Korean speciality).
     *   img: photo in img/dishes/ (optional) — shown as a thumbnail, tap to enlarge.
     * Source: Tasty Cloud card, November 2026. */
    {
      id: 'drinks', icon: 'glass', drinks: true,
      t: {
        fr: { title: 'Boissons' }, en: { title: 'Drinks' }, de: { title: 'Getränke' }, ko: { title: '음료 · 주류' }
      },
      note: {
        fr: 'L’abus d’alcool est dangereux pour la santé. À consommer avec modération.',
        en: 'Alcohol abuse is dangerous for your health. Please drink responsibly.',
        de: 'Übermäßiger Alkoholkonsum ist gesundheitsschädlich. Bitte genießen Sie verantwortungsvoll.',
        ko: '과도한 음주는 건강에 해롭습니다. 적당히 즐겨 주세요.'
      },
      groups: [
        { id: 'aperitifs', t: { fr: 'Apéritifs', en: 'Aperitifs', de: 'Aperitifs', ko: '식전주' } },
        { id: 'beers', t: { fr: 'Bières', en: 'Beers', de: 'Biere', ko: '맥주' } },
        { id: 'wines', t: { fr: 'Vins', en: 'Wines', de: 'Weine', ko: '와인' },
          subs: [{ id: 'red', t: { fr: 'Vins rouges', en: 'Red wines', de: 'Rotweine', ko: '레드 와인' } }, { id: 'white', t: { fr: 'Vins blancs', en: 'White wines', de: 'Weißweine', ko: '화이트 와인' } }, { id: 'rose', t: { fr: 'Vin rosé', en: 'Rosé wine', de: 'Roséwein', ko: '로제 와인' } }] },
        { id: 'digestifs', t: { fr: 'Digestifs', en: 'Digestifs', de: 'Digestifs', ko: '식후주' } },
        { id: 'softs', t: { fr: 'Sans alcool', en: 'Soft drinks', de: 'Alkoholfrei', ko: '무알코올' } },
        { id: 'hot', t: { fr: 'Thés & cafés', en: 'Tea & coffee', de: 'Tee & Kaffee', ko: '차 · 커피' } }
      ],
      items: [
        { id: 'd-cocktail', group: 'aperitifs', size: '12 cl', price: 5, korean: true,
          t: { fr: { title: 'Cocktail maison', desc: 'À base de crème de riz et de crème de cassis' }, en: { title: 'House cocktail', desc: 'Rice cream and blackcurrant liqueur' }, de: { title: 'Hauscocktail', desc: 'Mit Reiscreme und Cassislikör' }, ko: { title: '하우스 칵테일', desc: '쌀 크림과 카시스 리큐어 베이스' } } },
        { id: 'd-sansachun', group: 'aperitifs', size: '4 cl / 37,5 cl', price: '5 / 17', korean: true,
          t: { fr: { title: 'Sansachun', desc: 'Apéritif coréen fruité, à base d’aubépine et de cornouiller' }, en: { title: 'Sansachun', desc: 'Fruity Korean aperitif made with hawthorn and cornelian cherry' }, de: { title: 'Sansachun', desc: 'Fruchtiger koreanischer Aperitif aus Weißdorn und Kornelkirsche' }, ko: { title: '산사춘', desc: '산사나무 열매와 산수유로 빚은 과실주' } } },
        { id: 'd-bekseju', group: 'aperitifs', size: '4 cl / 37,5 cl', price: '5 / 17', korean: true,
          t: { fr: { title: 'Bekseju', desc: 'Apéritif coréen à base de 12 épices' }, en: { title: 'Baekseju', desc: 'Korean aperitif made with 12 herbs and spices' }, de: { title: 'Baekseju', desc: 'Koreanischer Aperitif mit 12 Kräutern und Gewürzen' }, ko: { title: '백세주', desc: '12가지 약재로 빚은 전통주' } } },
        { id: 'd-soju', group: 'aperitifs', size: '4 cl / 35 cl', price: '5 / 17', korean: true,
          t: { fr: { title: 'Soju', desc: 'Spiritueux originaire de Corée' }, en: { title: 'Soju', desc: 'Korea’s classic clear spirit' }, de: { title: 'Soju', desc: 'Der klassische Klarschnaps aus Korea' }, ko: { title: '소주' } } },
        { id: 'd-makgeolli', group: 'aperitifs', size: '75 cl', price: 17, korean: true,
          t: { fr: { title: 'Makgeolli', desc: 'Alcool de riz doux et laiteux (6,5 à 7°)' }, en: { title: 'Makgeolli', desc: 'Sweet, milky rice wine (6.5–7% vol.)' }, de: { title: 'Makgeolli', desc: 'Milder, milchiger Reiswein (6,5–7 % Vol.)' }, ko: { title: '막걸리' } } },
        { id: 'd-spritz', group: 'aperitifs', size: '20 cl', price: 8.5,
          t: { fr: { title: 'Apérol spritz' }, en: { title: 'Aperol spritz' }, de: { title: 'Aperol Spritz' }, ko: { title: '아페롤 스프리츠' } } },
        { id: 'd-hugo', group: 'aperitifs', size: '20 cl', price: 9.5,
          t: { fr: { title: 'Hugo', desc: 'Prosecco, eau gazeuse, liqueur de sureau, menthe et citron' }, en: { title: 'Hugo', desc: 'Prosecco, sparkling water, elderflower liqueur, mint and lemon' }, de: { title: 'Hugo', desc: 'Prosecco, Sprudelwasser, Holunderblütenlikör, Minze und Zitrone' }, ko: { title: '휴고', desc: '프로세코, 탄산수, 엘더플라워 리큐어, 민트, 레몬' } } },
        { id: 'd-virgin-spritz', group: 'aperitifs', size: '20 cl', price: 8.5,
          t: { fr: { title: 'Virgin Spritz (sans alcool)', desc: 'Un spritz pétillant aux saveurs d’orange et d’épices' }, en: { title: 'Virgin Spritz (alcohol-free)', desc: 'A sparkling spritz with orange and spice flavours' }, de: { title: 'Virgin Spritz (alkoholfrei)', desc: 'Ein prickelnder Spritz mit Orangen- und Gewürznoten' }, ko: { title: '버진 스프리츠 (무알코올)', desc: '오렌지와 향신료 풍미의 스파클링 스프리츠' } } },
        { id: 'd-virgin', group: 'aperitifs', size: '25 cl', price: 5,
          t: { fr: { title: 'Cocktail sans alcool', desc: 'Jus d’ananas, de papaye, d’orange, de goyave et de banane, sirop de grenadine' }, en: { title: 'Alcohol-free cocktail', desc: 'Pineapple, papaya, orange, guava and banana juices, grenadine syrup' }, de: { title: 'Alkoholfreier Cocktail', desc: 'Ananas-, Papaya-, Orangen-, Guaven- und Bananensaft, Grenadinesirup' }, ko: { title: '무알코올 칵테일', desc: '파인애플, 파파야, 오렌지, 구아바, 바나나 주스와 석류 시럽' } } },
        { id: 'd-cremant', img: 'drink-cremant', group: 'aperitifs', size: '12 cl / 75 cl', price: '7 / 37',
          t: { fr: { title: 'Crémant d’Alsace', desc: 'AOP – Brut Prestige · la coupe ou la bouteille' }, en: { title: 'Crémant d’Alsace (sparkling wine)', desc: 'AOP – Brut Prestige · by the glass or the bottle' }, de: { title: 'Crémant d’Alsace (Sekt)', desc: 'AOP – Brut Prestige · Glas oder Flasche' }, ko: { title: '크레망 달자스 (스파클링 와인)', desc: 'AOP – 브뤼 프레스티지 · 잔 또는 병' } } },
        { id: 'd-champagne', img: 'drink-ruinart', group: 'aperitifs', size: '75 cl', price: 90,
          t: { fr: { title: 'Champagne « R » de Ruinart', desc: 'Brut' }, en: { title: 'Champagne “R” de Ruinart', desc: 'Brut' }, de: { title: 'Champagner „R“ de Ruinart', desc: 'Brut' }, ko: { title: '샴페인 «R» 드 뤼나르', desc: '브뤼' } } },
        { id: 'd-kir', group: 'aperitifs', size: '12 cl', price: 7.5,
          t: { fr: { title: 'Kir royal' }, en: { title: 'Kir royal' }, de: { title: 'Kir Royal' }, ko: { title: '키르 루아얄' } } },
        { id: 'd-ricard', group: 'aperitifs', size: '2 cl', price: 4,
          t: { fr: { title: 'Ricard' }, en: { title: 'Ricard (pastis)' }, de: { title: 'Ricard (Pastis)' }, ko: { title: '리카르 (파스티스)' } } },
        { id: 'd-ricard2', group: 'aperitifs', size: '2 cl', price: 4.5,
          t: { fr: { title: 'Ricard tomate (grenadine) – Ricard perroquet (menthe)' }, en: { title: 'Ricard with grenadine or mint syrup' }, de: { title: 'Ricard mit Grenadine- oder Minzsirup' }, ko: { title: '리카르 + 석류 시럽 또는 민트 시럽' } } },
        { id: 'd-martini', group: 'aperitifs', size: '4 cl', price: 6,
          t: { fr: { title: 'Martini (rouge / blanc)' }, en: { title: 'Martini (red / white)' }, de: { title: 'Martini (rot / weiß)' }, ko: { title: '마티니 (로쏘 / 비앙코)' } } },
        { id: 'd-whisky', group: 'aperitifs', size: '4 cl', price: 7,
          t: { fr: { title: 'Whisky Jack Daniel’s' }, en: { title: 'Jack Daniel’s whiskey' }, de: { title: 'Whiskey Jack Daniel’s' }, ko: { title: '잭 다니엘 위스키' } } },
        { id: 'd-korean-beer', img: 'drink-kloud', group: 'beers', size: '33 cl', price: 6.95, korean: true,
          t: { fr: { title: 'Bière coréenne' }, en: { title: 'Korean beer' }, de: { title: 'Koreanisches Bier' }, ko: { title: '한국 맥주' } } },
        { id: 'd-spezial', group: 'beers', size: '25 cl / 50 cl', price: '3,50 / 6,80',
          t: { fr: { title: 'Alpirsbacher Spezial', desc: 'Bière blonde pression' }, en: { title: 'Alpirsbacher Spezial', desc: 'Draught lager' }, de: { title: 'Alpirsbacher Spezial', desc: 'Helles Bier vom Fass' }, ko: { title: '알피르스바허 슈페치알', desc: '라거 생맥주' } } },
        { id: 'd-weisse', group: 'beers', size: '25 cl / 50 cl', price: '4,50 / 8,80',
          t: { fr: { title: 'Alpirsbacher Klosterweisse', desc: 'Bière blanche' }, en: { title: 'Alpirsbacher Klosterweisse', desc: 'Wheat beer' }, de: { title: 'Alpirsbacher Klosterweisse', desc: 'Weißbier' }, ko: { title: '알피르스바허 클로스터바이세', desc: '밀맥주' } } },
        { id: 'd-licorne', group: 'beers', size: '25 cl / 50 cl', price: '4,80 / 9,20',
          t: { fr: { title: 'Licorne Black', desc: 'Bière pression' }, en: { title: 'Licorne Black', desc: 'Draught beer' }, de: { title: 'Licorne Black', desc: 'Bier vom Fass' }, ko: { title: '리코른 블랙', desc: '생맥주' } } },
        { id: 'd-grimbergen', group: 'beers', size: '25 cl / 50 cl', price: '4,80 / 9,20',
          t: { fr: { title: 'Grimbergen', desc: 'Bière d’automne' }, en: { title: 'Grimbergen', desc: 'Autumn beer' }, de: { title: 'Grimbergen', desc: 'Herbstbier' }, ko: { title: '그림버겐', desc: '가을 맥주' } } },
        { id: 'd-nabeer', img: 'drink-alpirsbacher-00', group: 'beers', size: '33 cl', price: 3.9,
          t: { fr: { title: 'Bière sans alcool', desc: 'Alpirsbacher' }, en: { title: 'Alcohol-free beer', desc: 'Alpirsbacher' }, de: { title: 'Alkoholfreies Bier', desc: 'Alpirsbacher' }, ko: { title: '무알코올 맥주', desc: '알피르스바허' } } },
        { id: 'd-picon', group: 'beers', size: '25 cl / 50 cl', price: '3,90 / 7,50',
          t: { fr: { title: 'Amer – Cynar – Picon bière' }, en: { title: 'Beer with Amer, Cynar or Picon' }, de: { title: 'Bier mit Amer, Cynar oder Picon' }, ko: { title: '아메르 · 치나르 · 피콩 비어' } } },
        { id: 'd-panache', group: 'beers', size: '25 cl / 50 cl', price: '3,80 / 7,20',
          t: { fr: { title: 'Panaché' }, en: { title: 'Shandy (beer & lemonade)' }, de: { title: 'Radler' }, ko: { title: '파나셰 (맥주 + 레모네이드)' } } },
        { id: 'd-monaco', group: 'beers', size: '25 cl / 50 cl', price: '3,90 / 7,50',
          t: { fr: { title: 'Monaco', desc: 'Panaché à la grenadine' }, en: { title: 'Monaco', desc: 'Shandy with grenadine' }, de: { title: 'Monaco', desc: 'Radler mit Grenadine' }, ko: { title: '모나코', desc: '석류 시럽을 넣은 파나셰' } } },
        { id: 'w-pinot-noir', group: 'wines', sub: 'red', sizes: [['12 cl', 6.5], ['25 cl', 13], ['50 cl', 26], ['75 cl', 36]], year: '2024', bio: true,
          t: { fr: { title: 'Pinot Noir – Alsace AOP', desc: 'Alsace · Paul Ginglinger, Eguisheim' }, en: { title: 'Pinot Noir – Alsace AOP', desc: 'Alsace · Paul Ginglinger, Eguisheim' }, de: { title: 'Pinot Noir – Alsace AOP', desc: 'Elsass · Paul Ginglinger, Eguisheim' }, ko: { title: 'Pinot Noir – Alsace AOP', desc: '알자스 · Paul Ginglinger, Eguisheim' } } },
        { id: 'w-rocailles', group: 'wines', sub: 'red', size: '75 cl', price: 65, year: '2023', bio: true,
          t: { fr: { title: 'Pinot Noir « Les Rocailles » – Alsace AOP', desc: 'Alsace · Domaine Paul Ginglinger' }, en: { title: 'Pinot Noir « Les Rocailles » – Alsace AOP', desc: 'Alsace · Domaine Paul Ginglinger' }, de: { title: 'Pinot Noir « Les Rocailles » – Alsace AOP', desc: 'Elsass · Domaine Paul Ginglinger' }, ko: { title: 'Pinot Noir « Les Rocailles » – Alsace AOP', desc: '알자스 · Domaine Paul Ginglinger' } } },
        { id: 'w-santenay', group: 'wines', sub: 'red', size: '75 cl', price: 70, year: '2022',
          t: { fr: { title: 'Santenay AOC « Clos des Cornières »', desc: 'Bourgogne · Domaine Chapelle & Fils' }, en: { title: 'Santenay AOC « Clos des Cornières »', desc: 'Burgundy · Domaine Chapelle & Fils' }, de: { title: 'Santenay AOC « Clos des Cornières »', desc: 'Burgund · Domaine Chapelle & Fils' }, ko: { title: 'Santenay AOC « Clos des Cornières »', desc: '부르고뉴 · Domaine Chapelle & Fils' } } },
        { id: 'w-gigondas', group: 'wines', sub: 'red', size: '75 cl', price: 48, year: '2022',
          t: { fr: { title: 'Gigondas AOC', desc: 'Vallée du Rhône · Le Seigneur du Raveil' }, en: { title: 'Gigondas AOC', desc: 'Rhône Valley · Le Seigneur du Raveil' }, de: { title: 'Gigondas AOC', desc: 'Rhônetal · Le Seigneur du Raveil' }, ko: { title: 'Gigondas AOC', desc: '론 밸리 · Le Seigneur du Raveil' } } },
        { id: 'w-brondelle', group: 'wines', sub: 'red', size: '75 cl', price: 42, year: '2022',
          t: { fr: { title: 'Château Brondelle – Graves AOP', desc: 'Bordeaux' }, en: { title: 'Château Brondelle – Graves AOP', desc: 'Bordeaux' }, de: { title: 'Château Brondelle – Graves AOP', desc: 'Bordeaux' }, ko: { title: 'Château Brondelle – Graves AOP', desc: '보르도' } } },
        { id: 'w-chateauneuf', group: 'wines', sub: 'red', size: '75 cl', price: 70, year: '2020', bio: true,
          t: { fr: { title: 'Châteauneuf-du-Pape AOC', desc: 'Vallée du Rhône · Domaine Lafond – Roc Épine — finesse, élégance et arômes de fruits rouges bien mûrs' }, en: { title: 'Châteauneuf-du-Pape AOC', desc: 'Rhône Valley · Domaine Lafond – Roc Épine — finesse, elegance and ripe red-fruit aromas' }, de: { title: 'Châteauneuf-du-Pape AOC', desc: 'Rhônetal · Domaine Lafond – Roc Épine — Finesse, Eleganz und Aromen reifer roter Früchte' }, ko: { title: 'Châteauneuf-du-Pape AOC', desc: '론 밸리 · Domaine Lafond – Roc Épine — 섬세하고 우아하며 잘 익은 붉은 과일 향' } } },
        { id: 'w-crozes', group: 'wines', sub: 'red', size: '75 cl', price: 48, year: '2024',
          t: { fr: { title: 'Crozes-Hermitage AOC', desc: 'Vallée du Rhône · Laurent Fayolle — Syrah' }, en: { title: 'Crozes-Hermitage AOC', desc: 'Rhône Valley · Laurent Fayolle — Syrah' }, de: { title: 'Crozes-Hermitage AOC', desc: 'Rhônetal · Laurent Fayolle — Syrah' }, ko: { title: 'Crozes-Hermitage AOC', desc: '론 밸리 · Laurent Fayolle — 시라' } } },
        { id: 'w-vacqueyras', group: 'wines', sub: 'red', size: '75 cl', price: 49, year: '2023',
          t: { fr: { title: 'Vacqueyras AOP', desc: 'Vallée du Rhône · Domaine de la Présidente – Patrick Galant' }, en: { title: 'Vacqueyras AOP', desc: 'Rhône Valley · Domaine de la Présidente – Patrick Galant' }, de: { title: 'Vacqueyras AOP', desc: 'Rhônetal · Domaine de la Présidente – Patrick Galant' }, ko: { title: 'Vacqueyras AOP', desc: '론 밸리 · Domaine de la Présidente – Patrick Galant' } } },
        { id: 'w-vacqueyras-1717', group: 'wines', sub: 'red', size: '75 cl', price: 99, year: '2022',
          t: { fr: { title: 'Vacqueyras AOP « 1717 »', desc: 'Vallée du Rhône · Domaine Arnoux & Fils — 70 % grenache, 30 % mourvèdre' }, en: { title: 'Vacqueyras AOP « 1717 »', desc: 'Rhône Valley · Domaine Arnoux & Fils — 70% Grenache, 30% Mourvèdre' }, de: { title: 'Vacqueyras AOP « 1717 »', desc: 'Rhônetal · Domaine Arnoux & Fils — 70 % Grenache, 30 % Mourvèdre' }, ko: { title: 'Vacqueyras AOP « 1717 »', desc: '론 밸리 · Domaine Arnoux & Fils — 그르나슈 70%, 무르베드르 30%' } } },
        { id: 'w-corbieres', group: 'wines', sub: 'red', sizes: [['12 cl', 6], ['25 cl', 11], ['50 cl', 21], ['75 cl', 30]], year: '2023',
          t: { fr: { title: 'Corbières AOP – Le Prieuré', desc: 'Languedoc-Roussillon · Château de Vaugelas' }, en: { title: 'Corbières AOP – Le Prieuré', desc: 'Languedoc-Roussillon · Château de Vaugelas' }, de: { title: 'Corbières AOP – Le Prieuré', desc: 'Languedoc-Roussillon · Château de Vaugelas' }, ko: { title: 'Corbières AOP – Le Prieuré', desc: '랑그독루시용 · Château de Vaugelas' } } },
        { id: 'w-druides', group: 'wines', sub: 'red', sizes: [['12 cl', 6.5], ['25 cl', 12.9], ['50 cl', 25], ['75 cl', 36]], year: '2022',
          t: { fr: { title: 'Cuvée des Druides – Lussac Saint-Émilion AOP', desc: 'Bordeaux' }, en: { title: 'Cuvée des Druides – Lussac Saint-Émilion AOP', desc: 'Bordeaux' }, de: { title: 'Cuvée des Druides – Lussac Saint-Émilion AOP', desc: 'Bordeaux' }, ko: { title: 'Cuvée des Druides – Lussac Saint-Émilion AOP', desc: '보르도' } } },
        { id: 'w-luberon', group: 'wines', sub: 'red', sizes: [['12 cl', 6], ['25 cl', 11.9], ['50 cl', 23], ['75 cl', 32]], year: '2023', bio: true,
          t: { fr: { title: 'Luberon AOP – Les Restanques', desc: 'Vallée du Rhône · Château Fontvert' }, en: { title: 'Luberon AOP – Les Restanques', desc: 'Rhône Valley · Château Fontvert' }, de: { title: 'Luberon AOP – Les Restanques', desc: 'Rhônetal · Château Fontvert' }, ko: { title: 'Luberon AOP – Les Restanques', desc: '론 밸리 · Château Fontvert' } } },
        { id: 'w-pinot-gris', group: 'wines', sub: 'white', sizes: [['12 cl', 5.5], ['25 cl', 11], ['50 cl', 22], ['75 cl', 32]], year: '2024', bio: true,
          t: { fr: { title: 'Pinot Gris – Les Prélats', desc: 'Alsace · Paul Ginglinger' }, en: { title: 'Pinot Gris – Les Prélats', desc: 'Alsace · Paul Ginglinger' }, de: { title: 'Pinot Gris – Les Prélats', desc: 'Elsass · Paul Ginglinger' }, ko: { title: 'Pinot Gris – Les Prélats', desc: '알자스 · Paul Ginglinger' } } },
        { id: 'w-gewurz', group: 'wines', sub: 'white', sizes: [['12 cl', 5.5], ['25 cl', 11], ['50 cl', 22], ['75 cl', 32]], year: '2022', bio: true,
          t: { fr: { title: 'Gewurztraminer – Wahlenbourg', desc: 'Alsace · Paul Ginglinger' }, en: { title: 'Gewurztraminer – Wahlenbourg', desc: 'Alsace · Paul Ginglinger' }, de: { title: 'Gewurztraminer – Wahlenbourg', desc: 'Elsass · Paul Ginglinger' }, ko: { title: 'Gewurztraminer – Wahlenbourg', desc: '알자스 · Paul Ginglinger' } } },
        { id: 'w-muscat', group: 'wines', sub: 'white', sizes: [['12 cl', 5.5], ['25 cl', 11], ['50 cl', 22], ['75 cl', 32]], bio: true,
          t: { fr: { title: 'Muscat – Caroline', desc: 'Alsace · Paul Ginglinger' }, en: { title: 'Muscat – Caroline', desc: 'Alsace · Paul Ginglinger' }, de: { title: 'Muscat – Caroline', desc: 'Elsass · Paul Ginglinger' }, ko: { title: 'Muscat – Caroline', desc: '알자스 · Paul Ginglinger' } } },
        { id: 'w-riesling', group: 'wines', sub: 'white', sizes: [['12 cl', 5.5], ['25 cl', 11], ['50 cl', 22], ['75 cl', 32]], year: '2024', bio: true,
          t: { fr: { title: 'Riesling – Drei Extra', desc: 'Alsace · Paul Ginglinger' }, en: { title: 'Riesling – Drei Extra', desc: 'Alsace · Paul Ginglinger' }, de: { title: 'Riesling – Drei Extra', desc: 'Elsass · Paul Ginglinger' }, ko: { title: 'Riesling – Drei Extra', desc: '알자스 · Paul Ginglinger' } } },
        { id: 'w-sauvignon', group: 'wines', sub: 'white', sizes: [['12 cl', 4.8], ['25 cl', 9.5], ['50 cl', 19], ['75 cl', 28]], year: '2025',
          t: { fr: { title: 'Sauvignon Blanc', desc: 'Val de Loire · Vin de France – Domaine de la Perrière' }, en: { title: 'Sauvignon Blanc', desc: 'Loire Valley · Vin de France – Domaine de la Perrière' }, de: { title: 'Sauvignon Blanc', desc: 'Loiretal · Vin de France – Domaine de la Perrière' }, ko: { title: 'Sauvignon Blanc', desc: '루아르 밸리 · Vin de France – Domaine de la Perrière' } } },
        { id: 'w-tortue', group: 'wines', sub: 'white', sizes: [['12 cl', 4.5], ['25 cl', 9], ['50 cl', 18], ['75 cl', 27]], year: '2024',
          t: { fr: { title: 'Tortue', desc: 'Côtes de Gascogne IGP · Domaine Uby — blanc sec, frais et fruité, notes de fruits exotiques et d’agrumes' }, en: { title: 'Tortue', desc: 'Côtes de Gascogne IGP · Domaine Uby — dry white, fresh and fruity, with exotic-fruit and citrus notes' }, de: { title: 'Tortue', desc: 'Côtes de Gascogne IGP · Domaine Uby — trockener Weißwein, frisch und fruchtig, Noten von exotischen Früchten und Zitrus' }, ko: { title: 'Tortue', desc: '코트 드 가스코뉴 IGP · Domaine Uby — 드라이 화이트, 상큼하고 과일 향, 열대 과일과 시트러스 노트' } } },
        { id: 'w-grives', group: 'wines', sub: 'white', sizes: [['12 cl', 5], ['25 cl', 10], ['50 cl', 20], ['75 cl', 30]], year: '2024',
          t: { fr: { title: 'Premières Grives', desc: 'Côtes de Gascogne IGP · Domaine Tariquet — blanc moelleux' }, en: { title: 'Premières Grives', desc: 'Côtes de Gascogne IGP · Domaine Tariquet — sweet white' }, de: { title: 'Premières Grives', desc: 'Côtes de Gascogne IGP · Domaine Tariquet — lieblicher Weißwein' }, ko: { title: 'Premières Grives', desc: '코트 드 가스코뉴 IGP · Domaine Tariquet — 스위트 화이트' } } },
        { id: 'w-galets', group: 'wines', sub: 'rose', sizes: [['12 cl', 4.8], ['25 cl', 9.5], ['50 cl', 19], ['75 cl', 28]], year: '2025',
          t: { fr: { title: 'Les Galets de Provence', desc: 'Côtes de Provence AOP' }, en: { title: 'Les Galets de Provence', desc: 'Côtes de Provence AOP' }, de: { title: 'Les Galets de Provence', desc: 'Côtes de Provence AOP' }, ko: { title: 'Les Galets de Provence', desc: '코트 드 프로방스 AOP' } } },
        { id: 'g-hwayo', group: 'digestifs', size: '4 cl', price: 8, korean: true,
          t: { fr: { title: 'Hwayo 41°', desc: 'Soju premium coréen, distillé à partir de riz' }, en: { title: 'Hwayo 41', desc: 'Premium Korean soju distilled from rice' }, de: { title: 'Hwayo 41', desc: 'Koreanischer Premium-Soju, aus Reis destilliert' }, ko: { title: '화요 41', desc: '쌀로 빚은 프리미엄 증류식 소주' } } },
        { id: 'g-ginseng', group: 'digestifs', size: '4 cl', price: 8, korean: true,
          t: { fr: { title: 'Liqueur de ginseng' }, en: { title: 'Ginseng liqueur' }, de: { title: 'Ginsenglikör' }, ko: { title: '인삼주' } } },
        { id: 'g-cognac', group: 'digestifs', size: '4 cl', price: 9.5,
          t: { fr: { title: 'Cognac Rémy Martin V.S.O.P' }, en: { title: 'Cognac Rémy Martin V.S.O.P' }, de: { title: 'Cognac Rémy Martin V.S.O.P' }, ko: { title: '레미 마르탱 V.S.O.P 코냑' } } },
        { id: 'g-donpapa', group: 'digestifs', size: '4 cl', price: 9,
          t: { fr: { title: 'Rhum Don Papa' }, en: { title: 'Don Papa rum' }, de: { title: 'Rum Don Papa' }, ko: { title: '돈 파파 럼' } } },
        { id: 'g-diplomatico', group: 'digestifs', size: '4 cl', price: 9.5,
          t: { fr: { title: 'Rhum Diplomático' }, en: { title: 'Diplomático rum' }, de: { title: 'Rum Diplomático' }, ko: { title: '디플로마티코 럼' } } },
        { id: 'g-bumbu', group: 'digestifs', size: '4 cl', price: 9,
          t: { fr: { title: 'Rhum Bumbu' }, en: { title: 'Bumbu rum' }, de: { title: 'Rum Bumbu' }, ko: { title: '범부 럼' } } },
        { id: 's-pellegrino', group: 'softs', size: '1 l', price: 6,
          t: { fr: { title: 'San Pellegrino' }, en: { title: 'San Pellegrino (sparkling water)' }, de: { title: 'San Pellegrino (Mineralwasser mit Kohlensäure)' }, ko: { title: '산펠레그리노 (탄산수)' } } },
        { id: 's-evian', group: 'softs', size: '50 cl', price: 3.7,
          t: { fr: { title: 'Evian' }, en: { title: 'Evian (still water)' }, de: { title: 'Evian (stilles Wasser)' }, ko: { title: '에비앙 (생수)' } } },
        { id: 's-badoit', group: 'softs', size: '50 cl', price: 4,
          t: { fr: { title: 'Badoit' }, en: { title: 'Badoit (lightly sparkling water)' }, de: { title: 'Badoit (leicht sprudelnd)' }, ko: { title: '바두아 (약탄산수)' } } },
        { id: 's-perrier', group: 'softs', size: '33 cl', price: 4.5,
          t: { fr: { title: 'Perrier' }, en: { title: 'Perrier (sparkling water)' }, de: { title: 'Perrier (Sprudelwasser)' }, ko: { title: '페리에 (탄산수)' } } },
        { id: 's-orangina', group: 'softs', size: '33 cl', price: 4,
          t: { fr: { title: 'Orangina' }, en: { title: 'Orangina' }, de: { title: 'Orangina' }, ko: { title: '오랑지나' } } },
        { id: 's-coca', group: 'softs', size: '33 cl', price: 3.9,
          t: { fr: { title: 'Coca-Cola' }, en: { title: 'Coca-Cola' }, de: { title: 'Coca-Cola' }, ko: { title: '코카콜라' } } },
        { id: 's-cocazero', group: 'softs', size: '33 cl', price: 3.9,
          t: { fr: { title: 'Coca-Cola Zéro' }, en: { title: 'Coca-Cola Zero' }, de: { title: 'Coca-Cola Zero' }, ko: { title: '코카콜라 제로' } } },
        { id: 's-cocacherry', group: 'softs', size: '33 cl', price: 3.9,
          t: { fr: { title: 'Coca-Cola Cherry' }, en: { title: 'Coca-Cola Cherry' }, de: { title: 'Coca-Cola Cherry' }, ko: { title: '코카콜라 체리' } } },
        { id: 's-icetea', group: 'softs', size: '25 cl', price: 3.7,
          t: { fr: { title: 'Fuze Tea' }, en: { title: 'Fuze Tea (iced tea)' }, de: { title: 'Fuze Tea (Eistee)' }, ko: { title: '퓨즈티 (아이스티)' } } },
        { id: 's-limonade', group: 'softs', size: '25 cl', price: 3.7,
          t: { fr: { title: 'Limonade' }, en: { title: 'Lemonade' }, de: { title: 'Limonade' }, ko: { title: '레모네이드' } } },
        { id: 's-diabolo', group: 'softs', size: '25 cl', price: 4,
          t: { fr: { title: 'Diabolo', desc: 'Limonade + sirop au choix' }, en: { title: 'Diabolo', desc: 'Lemonade with a syrup of your choice' }, de: { title: 'Diabolo', desc: 'Limonade mit Sirup nach Wahl' }, ko: { title: '디아볼로', desc: '레모네이드 + 원하는 시럽' } } },
        { id: 's-juice', group: 'softs', size: '25 cl', price: 4,
          t: { fr: { title: 'Jus de fruits' }, en: { title: 'Fruit juice' }, de: { title: 'Fruchtsaft' }, ko: { title: '과일 주스' } } },
        { id: 's-aloe', group: 'softs', size: '25 cl', price: 5, korean: true,
          t: { fr: { title: 'Jus d’aloe vera' }, en: { title: 'Aloe vera drink' }, de: { title: 'Aloe-Vera-Saft' }, ko: { title: '알로에 주스' } } },
        { id: 's-sirop', group: 'softs', size: '25 cl', price: 2.8,
          t: { fr: { title: 'Sirop à l’eau « Monin »' }, en: { title: 'Syrup with water (Monin)' }, de: { title: 'Sirup mit Wasser (Monin)' }, ko: { title: '시럽 워터 (모닌)' } } },
        { id: 'h-barley', group: 'hot', size: '', price: 3.5, korean: true,
          t: { fr: { title: 'Thé au blé Sempio' }, en: { title: 'Sempio grain tea' }, de: { title: 'Getreidetee Sempio' }, ko: { title: '샘표 보리차' } } },
        { id: 'h-green', group: 'hot', size: '', price: 3.5,
          t: { fr: { title: 'Thé vert' }, en: { title: 'Green tea' }, de: { title: 'Grüner Tee' }, ko: { title: '녹차' } } },
        { id: 'h-espresso', group: 'hot', size: '', price: 2,
          t: { fr: { title: 'Expresso' }, en: { title: 'Espresso' }, de: { title: 'Espresso' }, ko: { title: '에스프레소' } } },
        { id: 'h-deca', group: 'hot', size: '', price: 2,
          t: { fr: { title: 'Décaféiné' }, en: { title: 'Decaf espresso' }, de: { title: 'Entkoffeinierter Espresso' }, ko: { title: '디카페인 에스프레소' } } },
        { id: 'h-creme', group: 'hot', size: '', price: 2.5,
          t: { fr: { title: 'Café crème' }, en: { title: 'Coffee with milk' }, de: { title: 'Milchkaffee' }, ko: { title: '카페 크렘 (밀크 커피)' } } }
      ]
    }
  ]
};
