/*
 * JALMOGOYO – menu content (source: restaurant menu PDF, "Mars 2023").
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
 */
window.MENU_DATA = {
  version: 'Mars 2023',
  phone: '03 89 45 55 88',
  address: '41 rue de la Sinne, 68100 Mulhouse',

  categories: [
    /* ------------------------------------------------------------ */
    {
      id: 'suggestions', icon: 'star',
      t: {
        fr: { title: 'Suggestions', sub: 'Pour 2 personnes minimum · prix par personne' },
        en: { title: 'Chef’s suggestions', sub: 'For 2 persons minimum · price per person' },
        de: { title: 'Empfehlungen', sub: 'Ab 2 Personen · Preis pro Person' },
        ko: { title: '추천 메뉴', sub: '2인 이상 주문 · 1인 가격' }
      },
      items: [
        { id: 'bbq-assortment', al: ['gluten', 'soy', 'sesame', 'crustaceans'], num: '40', name: 'Modeum Gui', ko: '모둠 구이', price: 34, img: 'bbq-assortment', two: true, rice: true,
          t: {
            fr: { title: 'Barbecue assortiment', desc: 'Assortiment à griller vous-même à table : bœuf, poulet, agneau, canard et crevettes. Le meilleur moyen de tout goûter !' },
            en: { title: 'Mixed barbecue', desc: 'A platter to grill yourself at the table: beef, chicken, lamb, duck and shrimps. The best way to taste everything!' },
            de: { title: 'Gemischtes Barbecue', desc: 'Platte zum Selbstgrillen am Tisch: Rind, Huhn, Lamm, Ente und Garnelen. Die beste Art, alles zu probieren!' },
            ko: { title: '모둠 구이', desc: '테이블에서 직접 구워 먹는 모둠: 소고기, 닭고기, 양고기, 오리고기, 새우. 모든 맛을 한 번에!' }
          } },
        { id: 'fondue', al: ['gluten', 'soy', 'sesame', 'eggs'], num: '24', name: 'Sogogi Jeongol', ko: '소고기 전골', price: 33, img: 'fondue', two: true,
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
        { id: 'lunch-a', al: ['gluten', 'soy', 'sesame'], num: 'A', name: 'Jeyuk / Dak Bokkeum', ko: '제육볶음 / 닭볶음', price: 16, img: 'jeyuk-bokkeum', spicy: 2, rice: true,
          t: {
            fr: { title: 'Menu A', desc: 'Poitrine de porc ou émincé de poulet sauté à la sauce piquante.' },
            en: { title: 'Menu A', desc: 'Stir-fried pork belly or sliced chicken in spicy sauce.' },
            de: { title: 'Menü A', desc: 'Schweinebauch oder geschnetzeltes Hähnchen in scharfer Sauce gebraten.' },
            ko: { title: 'A 메뉴', desc: '매콤한 양념에 볶은 돼지 삼겹살 또는 닭고기.' }
          } },
        { id: 'lunch-c', al: ['soy', 'gluten', 'fish', 'crustaceans'], num: 'C', name: 'Dubu Jjigae', ko: '두부찌개', price: 15, img: 'dubu-jjigae', spicy: 1, rice: true,
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
        { id: 'lunch-e', al: ['eggs', 'soy', 'gluten', 'sesame'], num: 'E', name: 'Bibimbap', ko: '소고기 비빔밥', price: 18, img: 'bibimbap-beef', rice: true,
          t: {
            fr: { title: 'Menu E', desc: 'Bibimbap au bœuf.' },
            en: { title: 'Menu E', desc: 'Beef bibimbap.' },
            de: { title: 'Menü E', desc: 'Bibimbap mit Rindfleisch.' },
            ko: { title: 'E 메뉴', desc: '소고기 비빔밥.' }
          } },
        { id: 'lunch-f', al: ['fish', 'eggs', 'soy', 'gluten', 'sesame'], num: 'F', name: 'Bibimbap', ko: '연어 비빔밥', price: 18, img: 'bibimbap-salmon', rice: true,
          t: {
            fr: { title: 'Menu F', desc: 'Bibimbap au saumon.' },
            en: { title: 'Menu F', desc: 'Salmon bibimbap.' },
            de: { title: 'Menü F', desc: 'Bibimbap mit Lachs.' },
            ko: { title: 'F 메뉴', desc: '연어 비빔밥.' }
          } },
        { id: 'lunch-g', al: ['eggs', 'soy', 'gluten', 'sesame'], num: 'G', name: 'Bibimbap', ko: '야채 비빔밥', price: 16, img: 'bibimbap-veg', veg: true, rice: true,
          t: {
            fr: { title: 'Menu G', desc: 'Bibimbap aux légumes.' },
            en: { title: 'Menu G', desc: 'Vegetable bibimbap.' },
            de: { title: 'Menü G', desc: 'Bibimbap mit Gemüse.' },
            ko: { title: 'G 메뉴', desc: '야채 비빔밥.' }
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
            fr: { title: 'Barbecue bœuf (entrecôte)', desc: 'Entrecôte de bœuf à griller à table.' },
            en: { title: 'Beef barbecue (rib-eye)', desc: 'Beef rib-eye to grill at your table.' },
            de: { title: 'Rindfleisch-Barbecue (Entrecôte)', desc: 'Rinder-Entrecôte zum Grillen am Tisch.' },
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
        fr: { title: 'Les bibimbaps', sub: 'Préparés dans un bol de pierre chaude' },
        en: { title: 'Bibimbap', sub: 'Prepared in a hot stone bowl' },
        de: { title: 'Bibimbap', sub: 'Im heißen Steintopf zubereitet' },
        ko: { title: '돌솥 비빔밥', sub: '뜨거운 돌솥에 제공됩니다' }
      },
      intro: {
        fr: 'Le bibimbap (« riz mélangé ») : du riz garni de légumes et d’un ingrédient au choix. Ajoutez la sauce pimentée selon votre goût et mélangez bien. Le bol est brûlant : le riz devient croustillant au fond !',
        en: 'Bibimbap (“mixed rice”): rice topped with vegetables and your choice of topping. Add chili paste to taste and mix well. The bowl is very hot: the rice turns crispy at the bottom!',
        de: 'Bibimbap („gemischter Reis“): Reis mit Gemüse und einer Zutat nach Wahl. Chilipaste nach Geschmack dazugeben und gut mischen. Der Topf ist sehr heiß: Der Reis wird unten knusprig!',
        ko: '비빔밥: 밥 위에 나물과 재료를 올렸어요. 고추장을 취향껏 넣고 잘 비벼 드세요. 돌솥이 뜨거우니 조심하세요. 바닥의 누룽지도 별미예요!'
      },
      items: [
        { id: 'bibimbap-seafood', al: ['crustaceans', 'molluscs', 'eggs', 'soy', 'gluten', 'sesame'], num: '32', name: 'Haemul Bibimbap', ko: '해물 비빔밥', price: 23, img: 'bibimbap-seafood',
          t: {
            fr: { title: 'Bibimbap aux fruits de mer', desc: 'Riz, légumes et fruits de mer dans un bol de pierre chaude.' },
            en: { title: 'Seafood bibimbap', desc: 'Rice, vegetables and seafood in a hot stone bowl.' },
            de: { title: 'Bibimbap mit Meeresfrüchten', desc: 'Reis, Gemüse und Meeresfrüchte im heißen Steintopf.' },
            ko: { title: '해물 돌솥 비빔밥', desc: '밥, 나물, 해물을 뜨거운 돌솥에 담았어요.' }
          } },
        { id: 'bibimbap-beef', al: ['eggs', 'soy', 'gluten', 'sesame'], num: '33', name: 'Sogogi Bibimbap', ko: '소고기 비빔밥', price: 22, img: 'bibimbap-beef',
          t: {
            fr: { title: 'Bibimbap au bœuf', desc: 'Riz, légumes et bœuf dans un bol de pierre chaude.' },
            en: { title: 'Beef bibimbap', desc: 'Rice, vegetables and beef in a hot stone bowl.' },
            de: { title: 'Bibimbap mit Rindfleisch', desc: 'Reis, Gemüse und Rindfleisch im heißen Steintopf.' },
            ko: { title: '소고기 돌솥 비빔밥', desc: '밥, 나물, 소고기를 뜨거운 돌솥에 담았어요.' }
          } },
        { id: 'bibimbap-salmon', al: ['fish', 'eggs', 'soy', 'gluten', 'sesame'], num: '34', name: 'Yeoneo Bibimbap', ko: '연어 비빔밥', price: 22, img: 'bibimbap-salmon',
          t: {
            fr: { title: 'Bibimbap au saumon', desc: 'Riz, légumes et saumon dans un bol de pierre chaude.' },
            en: { title: 'Salmon bibimbap', desc: 'Rice, vegetables and salmon in a hot stone bowl.' },
            de: { title: 'Bibimbap mit Lachs', desc: 'Reis, Gemüse und Lachs im heißen Steintopf.' },
            ko: { title: '연어 돌솥 비빔밥', desc: '밥, 나물, 연어를 뜨거운 돌솥에 담았어요.' }
          } },
        { id: 'bibimbap-veg', al: ['eggs', 'soy', 'gluten', 'sesame'], num: '35', name: 'Yachae Bibimbap', ko: '야채 비빔밥', price: 17, img: 'bibimbap-veg', veg: true,
          t: {
            fr: { title: 'Bibimbap végétarien', desc: 'Riz et mélange de légumes de saison dans un bol de pierre chaude.' },
            en: { title: 'Vegetarian bibimbap', desc: 'Rice and mixed seasonal vegetables in a hot stone bowl.' },
            de: { title: 'Vegetarisches Bibimbap', desc: 'Reis und Gemüse der Saison im heißen Steintopf.' },
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
    {
      id: 'aperitifs', icon: 'glass', drinks: true,
      t: {
        fr: { title: 'Apéritifs & bières' }, en: { title: 'Aperitifs & beers' }, de: { title: 'Aperitifs & Biere' }, ko: { title: '주류' }
      },
      note: {
        fr: 'L’abus d’alcool est dangereux pour la santé. À consommer avec modération.',
        en: 'Alcohol abuse is dangerous for your health. Please drink responsibly.',
        de: 'Übermäßiger Alkoholkonsum ist gesundheitsschädlich. Bitte genießen Sie verantwortungsvoll.',
        ko: '과도한 음주는 건강에 해롭습니다. 적당히 즐겨 주세요.'
      },
      items: [
        { id: 'd-cocktail', size: '12 cl', price: 5, korean: true,
          t: { fr: { title: 'Cocktail maison', desc: 'À la crème de riz' }, en: { title: 'House cocktail', desc: 'With rice cream' }, de: { title: 'Hauscocktail', desc: 'Mit Reiscreme' }, ko: { title: '하우스 칵테일', desc: '쌀 크림 베이스' } } },
        { id: 'd-sansachun', size: '4 cl / 37,5 cl', price: '5 / 17', korean: true,
          t: { fr: { title: 'Apéritif coréen Sansachun', desc: 'Fruité, à base d’aubépine et de cornouiller' }, en: { title: 'Korean aperitif Sansachun', desc: 'Fruity, made with hawthorn and cornelian cherry' }, de: { title: 'Koreanischer Aperitif Sansachun', desc: 'Fruchtig, aus Weißdorn und Kornelkirsche' }, ko: { title: '산사춘', desc: '산사나무 열매와 산수유로 빚은 과실주' } } },
        { id: 'd-bekseju', size: '4 cl / 37,5 cl', price: '5 / 17', korean: true,
          t: { fr: { title: 'Apéritif coréen Bekseju', desc: 'À base de 12 épices et plantes' }, en: { title: 'Korean aperitif Baekseju', desc: 'Made with 12 herbs and spices' }, de: { title: 'Koreanischer Aperitif Baekseju', desc: 'Mit 12 Kräutern und Gewürzen' }, ko: { title: '백세주', desc: '12가지 약재로 빚은 전통주' } } },
        { id: 'd-soju', size: '4 cl / 35 cl', price: '5 / 17', korean: true,
          t: { fr: { title: 'Soju', desc: 'L’alcool de riz le plus populaire de Corée' }, en: { title: 'Soju', desc: 'Korea’s most popular clear spirit' }, de: { title: 'Soju', desc: 'Der beliebteste Klarschnaps Koreas' }, ko: { title: '소주', desc: '' } } },
        { id: 'd-makgeolli', size: '75 cl', price: 17, korean: true,
          t: { fr: { title: 'Makgeolli', desc: 'Vin de riz traditionnel, laiteux et pétillant' }, en: { title: 'Makgeolli', desc: 'Traditional milky, lightly sparkling rice wine' }, de: { title: 'Makgeolli', desc: 'Traditioneller milchiger, leicht prickelnder Reiswein' }, ko: { title: '막걸리', desc: '' } } },
        { id: 'd-korean-beer', size: '33 cl', price: 6.95, korean: true,
          t: { fr: { title: 'Bière coréenne' }, en: { title: 'Korean beer' }, de: { title: 'Koreanisches Bier' }, ko: { title: '한국 맥주' } } },
        { id: 'd-virgin', size: '25 cl', price: 5,
          t: { fr: { title: 'Cocktail sans alcool' }, en: { title: 'Alcohol-free cocktail' }, de: { title: 'Alkoholfreier Cocktail' }, ko: { title: '무알코올 칵테일' } } },
        { id: 'd-cremant', size: '12 cl', price: 7,
          t: { fr: { title: 'Coupe de crémant' }, en: { title: 'Glass of crémant (sparkling wine)' }, de: { title: 'Glas Crémant (Sekt)' }, ko: { title: '크레망 (스파클링 와인) 한 잔' } } },
        { id: 'd-kir', size: '12 cl', price: 7.50,
          t: { fr: { title: 'Kir royal' }, en: { title: 'Kir royal' }, de: { title: 'Kir Royal' }, ko: { title: '키르 루아얄' } } },
        { id: 'd-spritz', size: '20 cl', price: 8.50,
          t: { fr: { title: 'Apérol spritz' }, en: { title: 'Aperol spritz' }, de: { title: 'Aperol Spritz' }, ko: { title: '아페롤 스프리츠' } } },
        { id: 'd-draught', size: '25 cl / 50 cl', price: '3,50 / 6,80',
          t: { fr: { title: 'Bière pression' }, en: { title: 'Draught beer' }, de: { title: 'Bier vom Fass' }, ko: { title: '생맥주' } } },
        { id: 'd-nabeer', size: '33 cl', price: 3.90,
          t: { fr: { title: 'Bière sans alcool' }, en: { title: 'Alcohol-free beer' }, de: { title: 'Alkoholfreies Bier' }, ko: { title: '무알코올 맥주' } } },
        { id: 'd-picon', size: '25 cl / 50 cl', price: '3,90 / 7,50',
          t: { fr: { title: 'Amer – Cynar – Picon bière' }, en: { title: 'Beer with Amer, Cynar or Picon' }, de: { title: 'Bier mit Amer, Cynar oder Picon' }, ko: { title: '아메르 · 치나르 · 피콩 비어' } } },
        { id: 'd-panache', size: '25 cl / 50 cl', price: '3,80 / 7,20',
          t: { fr: { title: 'Panaché' }, en: { title: 'Shandy (beer & lemonade)' }, de: { title: 'Radler' }, ko: { title: '파나셰 (맥주 + 레모네이드)' } } },
        { id: 'd-monaco', size: '25 cl / 50 cl', price: '3,90 / 7,50',
          t: { fr: { title: 'Monaco', desc: 'Panaché à la grenadine' }, en: { title: 'Monaco', desc: 'Shandy with grenadine' }, de: { title: 'Monaco', desc: 'Radler mit Grenadine' }, ko: { title: '모나코', desc: '석류 시럽을 넣은 파나셰' } } },
        { id: 'd-ricard', size: '2 cl', price: 4,
          t: { fr: { title: 'Ricard' }, en: { title: 'Ricard (pastis)' }, de: { title: 'Ricard (Pastis)' }, ko: { title: '리카르 (파스티스)' } } },
        { id: 'd-ricard2', size: '2 cl', price: 4.50,
          t: { fr: { title: 'Ricard tomate (grenadine) – Ricard perroquet (menthe)' }, en: { title: 'Ricard with grenadine or mint syrup' }, de: { title: 'Ricard mit Grenadine- oder Minzsirup' }, ko: { title: '리카르 + 석류 시럽 또는 민트 시럽' } } },
        { id: 'd-martini', size: '4 cl', price: 6,
          t: { fr: { title: 'Martini (rouge / blanc)' }, en: { title: 'Martini (red / white)' }, de: { title: 'Martini (rot / weiß)' }, ko: { title: '마티니 (로쏘 / 비앙코)' } } },
        { id: 'd-whisky', size: '4 cl', price: 7,
          t: { fr: { title: 'Whisky (Jack Daniel’s)' }, en: { title: 'Whisky (Jack Daniel’s)' }, de: { title: 'Whisky (Jack Daniel’s)' }, ko: { title: '위스키 (잭 다니엘)' } } },
        { id: 'd-supp', size: '', price: 0.30,
          t: { fr: { title: '+ Supplément sirop / rondelle de citron' }, en: { title: '+ Extra syrup / lemon slice' }, de: { title: '+ Extra Sirup / Zitronenscheibe' }, ko: { title: '+ 시럽 / 레몬 추가' } } }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'softs', icon: 'cup', drinks: true,
      t: {
        fr: { title: 'Boissons sans alcool' }, en: { title: 'Soft & hot drinks' }, de: { title: 'Alkoholfreie Getränke' }, ko: { title: '음료 · 차' }
      },
      items: [
        { id: 's-pellegrino', size: '1 l', price: 6, t: { fr: { title: 'San Pellegrino' }, en: { title: 'San Pellegrino (sparkling water)' }, de: { title: 'San Pellegrino (Mineralwasser mit Kohlensäure)' }, ko: { title: '산펠레그리노 (탄산수)' } } },
        { id: 's-evian', size: '50 cl', price: 3.70, t: { fr: { title: 'Evian' }, en: { title: 'Evian (still water)' }, de: { title: 'Evian (stilles Wasser)' }, ko: { title: '에비앙 (생수)' } } },
        { id: 's-badoit', size: '50 cl', price: 4, t: { fr: { title: 'Badoit' }, en: { title: 'Badoit (lightly sparkling water)' }, de: { title: 'Badoit (leicht sprudelnd)' }, ko: { title: '바두아 (약탄산수)' } } },
        { id: 's-perrier', size: '33 cl', price: 4.50, t: { fr: { title: 'Perrier' }, en: { title: 'Perrier (sparkling water)' }, de: { title: 'Perrier (Sprudelwasser)' }, ko: { title: '페리에 (탄산수)' } } },
        { id: 's-orangina', size: '25 cl', price: 4, t: { fr: { title: 'Orangina' }, en: { title: 'Orangina' }, de: { title: 'Orangina' }, ko: { title: '오랑지나' } } },
        { id: 's-coca', size: '33 cl', price: 3.90, t: { fr: { title: 'Coca-Cola' }, en: { title: 'Coca-Cola' }, de: { title: 'Coca-Cola' }, ko: { title: '코카콜라' } } },
        { id: 's-cocazero', size: '33 cl', price: 3.90, t: { fr: { title: 'Coca-Cola Zéro' }, en: { title: 'Coca-Cola Zero' }, de: { title: 'Coca-Cola Zero' }, ko: { title: '코카콜라 제로' } } },
        { id: 's-icetea', size: '25 cl', price: 3.70, t: { fr: { title: 'Ice Tea' }, en: { title: 'Iced tea' }, de: { title: 'Eistee' }, ko: { title: '아이스티' } } },
        { id: 's-tonic', size: '25 cl', price: 3.90, t: { fr: { title: 'Schweppes Tonic' }, en: { title: 'Schweppes Tonic' }, de: { title: 'Schweppes Tonic' }, ko: { title: '슈웹스 토닉' } } },
        { id: 's-limonade', size: '25 cl', price: 3.70, t: { fr: { title: 'Limonade' }, en: { title: 'Lemonade' }, de: { title: 'Limonade' }, ko: { title: '레모네이드' } } },
        { id: 's-diabolo', size: '25 cl', price: 4, t: { fr: { title: 'Diabolo', desc: 'Limonade + sirop au choix' }, en: { title: 'Diabolo', desc: 'Lemonade with a syrup of your choice' }, de: { title: 'Diabolo', desc: 'Limonade mit Sirup nach Wahl' }, ko: { title: '디아볼로', desc: '레모네이드 + 원하는 시럽' } } },
        { id: 's-juice', size: '25 cl', price: 4, t: { fr: { title: 'Jus de fruits', desc: 'Orange, pomme, abricot, tomate, mangue, cannelle' }, en: { title: 'Fruit juice', desc: 'Orange, apple, apricot, tomato, mango, cinnamon' }, de: { title: 'Fruchtsaft', desc: 'Orange, Apfel, Aprikose, Tomate, Mango, Zimt' }, ko: { title: '과일 주스', desc: '오렌지, 사과, 살구, 토마토, 망고, 시나몬' } } },
        { id: 's-aloe', size: '25 cl', price: 5, korean: true, t: { fr: { title: 'Jus d’aloe vera' }, en: { title: 'Aloe vera drink' }, de: { title: 'Aloe-Vera-Saft' }, ko: { title: '알로에 주스' } } },
        { id: 's-sirop', size: '25 cl', price: 2.80, t: { fr: { title: 'Sirop à l’eau « Monin »', desc: 'Pêche, violette, grenadine, fraise, menthe, citron' }, en: { title: 'Syrup with water (Monin)', desc: 'Peach, violet, grenadine, strawberry, mint, lemon' }, de: { title: 'Sirup mit Wasser (Monin)', desc: 'Pfirsich, Veilchen, Grenadine, Erdbeere, Minze, Zitrone' }, ko: { title: '시럽 워터 (모닌)', desc: '복숭아, 바이올렛, 석류, 딸기, 민트, 레몬' } } },
        { id: 's-tea', size: '', price: 3.50, korean: true, t: { fr: { title: 'Thé', desc: 'Blé, jasmin, vert, menthe, verveine · supplément eau + 2 €' }, en: { title: 'Tea', desc: 'Grain (barley), jasmine, green, mint, verbena · extra hot water + €2' }, de: { title: 'Tee', desc: 'Getreide (Gerste), Jasmin, Grün, Minze, Verbene · extra Wasser + 2 €' }, ko: { title: '차', desc: '보리차, 자스민차, 녹차, 민트차, 버베나차 · 물 추가 +2€' } } },
        { id: 's-espresso', size: '', price: 2, t: { fr: { title: 'Expresso – Déca' }, en: { title: 'Espresso – Decaf' }, de: { title: 'Espresso – Entkoffeiniert' }, ko: { title: '에스프레소 · 디카페인' } } },
        { id: 's-creme', size: '', price: 2.50, t: { fr: { title: 'Café crème' }, en: { title: 'Coffee with milk' }, de: { title: 'Milchkaffee' }, ko: { title: '카페 크렘 (밀크 커피)' } } }
      ]
    }
  ]
};
