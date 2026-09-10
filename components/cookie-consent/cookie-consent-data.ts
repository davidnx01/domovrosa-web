/**
 * Register súborov cookies používaných na webstránke domovrosa.sk.
 *
 * Tento súbor je jediným zdrojom pravdy pre tabuľky cookies zobrazované
 * v cookie lište. Pri akejkoľvek zmene (pridanie nástroja, zmena doby
 * platnosti, nový príjemca) stačí upraviť tento súbor – lišta sa
 * aktualizuje automaticky.
 *
 * Každý záznam musí obsahovať minimálne:
 *  - name        označenie cookie
 *  - description popis, t. j. na čo cookie slúži
 *  - provider    príjemca údajov
 *  - expiration  doba platnosti cookie
 */

export type TCookieRecord = {
  name: string;
  description: string;
  provider: string;
  expiration: string;
};

/** Dátum poslednej revízie registra cookies – zobrazuje sa v lište. */
export const COOKIES_LAST_REVIEW = "10. 9. 2026";

/** Nevyhnutné cookies – spracúvané bez súhlasu (§ 109 ods. 8 zákona č. 452/2021 Z. z.). */
export const NECESSARY_COOKIES: TCookieRecord[] = [
  {
    name: "cc_cookie",
    description:
      "Uchováva vaše rozhodnutie o súboroch cookies (ktoré kategórie ste povolili alebo odmietli), aby sa vás webstránka nepýtala pri každej návšteve. Neobsahuje žiadne údaje umožňujúce vašu priamu identifikáciu.",
    provider:
      "Zariadenie sociálnych služieb ROSA (domovrosa.sk) – prevádzkovateľ, cookie prvej strany",
    expiration: "6 mesiacov",
  },
];

/**
 * Funkčné cookies – nastavuje ich vložená mapa Google Maps na podstránke
 * Kontakty. Mapa sa načíta až po udelení súhlasu s touto kategóriou.
 */
export const FUNCTIONAL_COOKIES: TCookieRecord[] = [
  {
    name: "NID",
    description:
      "Cookie spoločnosti Google, ktorá si pamätá nastavenia mapy (napr. jazyk, preferovaný typ zobrazenia) a umožňuje zobrazenie interaktívnej mapy s našou polohou.",
    provider:
      "Google Ireland Limited / Google LLC (google.com) – cookie tretej strany",
    expiration: "6 mesiacov",
  },
  {
    name: "SOCS",
    description:
      "Cookie spoločnosti Google, ktorá uchováva stav vášho rozhodnutia o cookies v službách Google zobrazených na tejto stránke.",
    provider:
      "Google Ireland Limited / Google LLC (google.com) – cookie tretej strany",
    expiration: "13 mesiacov",
  },
  {
    name: "CONSENT",
    description:
      "Cookie spoločnosti Google slúžiaca na overenie, či ste už rozhodli o cookies v službách Google, a na ochranu pred zneužitím služby.",
    provider:
      "Google Ireland Limited / Google LLC (google.com) – cookie tretej strany",
    expiration: "2 roky",
  },
];
