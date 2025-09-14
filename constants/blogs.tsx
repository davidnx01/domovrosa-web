export const BLOGS_CONFIG = {
  categories: [
    {
      id: 1,
      name: "Aktivity",
      slug: "aktivity",
    },
    {
      id: 2,
      name: "Ročník 2022",
      slug: "rocnik-2022",
    },
  ],
  blogs: [
    {
      id: 1,
      name: "Letná grilovačka v ZSS Rosa",
      slug: "letna-grilovacka-v-zss-rosa",
      category: {
        id: 1,
        name: "Aktivity",
        slug: "aktivity",
      },
      image: '/placeholder.png',
      content:
        "<p>Letná grilovačka v ZSS Rosa bola plná radosti a chutných jedál. Naši klienti si užili spoločné chvíle pri grilovaní, hudbe a zábave. Tento deň nám pripomenul, aké dôležité je tráviť čas spolu a vytvárať nezabudnuteľné spomienky.</p>",
    },
    {
      id: 2,
      name: "Jesenná výzdoba v našom zariadení",
      slug: "jesenna-vyzdoba-v-nasom-zariadeni",
      category: {
        id: 1,
        name: "Aktivity",
        slug: "aktivity",
      },
      image: '/placeholder.png',
      content:
        "<p>Naši klienti sa zapojili do tvorby jesennej výzdoby, ktorá teraz zdobí naše priestory. Spoločne sme vyrábali dekorácie z prírodných materiálov, čo nám prinieslo veľa radosti a pocit spolupatričnosti. Výsledok je naozaj krásny a teší nás, že sme mohli byť súčasťou tohto kreatívneho procesu.</p>",
    },
    {
      id: 3,
      name: "Vianočné trhy v ZSS Rosa",
      slug: "vianocne-trhy-v-zss-rosa",
      category: {
        id: 2,
        name: "Ročník 2022",
        slug: "rocnik-2022",
      },
      image: '/placeholder.png',
      content:
        "<p>Vianočné trhy v ZSS Rosa boli plné sviatočnej atmosféry a radosti. Naši klienti pripravili rôzne výrobky, ktoré ponúkali na predaj, čím prispeli k vytvoreniu teplého a priateľského prostredia. Tento deň nám pripomenul význam komunity a vzájomnej podpory počas sviatočného obdobia.</p>",
    }
  ],
};
