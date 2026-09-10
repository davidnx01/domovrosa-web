import type { CookieConsentConfig } from "vanilla-cookieconsent";
import {
  COOKIES_LAST_REVIEW,
  FUNCTIONAL_COOKIES,
  NECESSARY_COOKIES,
  type TCookieRecord,
} from "./cookie-consent-data";

/** Stránka so Zásadami spracúvania osobných údajov (dokument na stiahnutie). */
export const COOKIE_INFO_URL = "/gdpr";

/**
 * Identifikačné údaje prevádzkovateľa – prevzaté zo Zásad spracúvania
 * osobných údajov fyzických osôb v ZSS ROSA.
 *
 * Pozn.: Zásady z roku 2019 uvádzajú ako kontakt na zodpovednú osobu
 * adresu zodpovednaosoba@domovrosa.sk. Podľa aktuálneho zadania je
 * zodpovednou osobou Martin Tekula – pri najbližšej aktualizácii Zásad
 * treba kontakt zosúladiť aj tam.
 */
export const CONTROLLER = {
  name: "Zariadenie sociálnych služieb ROSA",
  address: "Dúbravská cesta 1, 845 29 Bratislava",
  ico: "00603279",
  dpoName: "Martin Tekula",
  dpoEmail: "martin.tekula@domovrosa.sk",
} as const;

const cookieTableHeaders = {
  name: "Označenie cookie",
  description: "Účel / popis",
  provider: "Príjemca",
  expiration: "Doba platnosti",
};

const toCookieTable = (cookies: TCookieRecord[]) => ({
  headers: cookieTableHeaders,
  body: cookies.map((cookie) => ({
    name: cookie.name,
    description: cookie.description,
    provider: cookie.provider,
    expiration: cookie.expiration,
  })),
});

export const getCookieConsentConfig = (): CookieConsentConfig => {
  return {
    autoShow: true,
    disablePageInteraction: true,
    hideFromBots: true,
    mode: "opt-in",

    /**
     * Verzia znenia cookie lišty. Po každej podstatnej zmene (nová cookie,
     * nový príjemca, zmena účelu) toto číslo zvýšte – doteraz udelené
     * súhlasy sa tým stanú neplatnými a lišta sa návštevníkom zobrazí
     * znova, aby sa vyjadrili k aktuálnemu zneniu.
     *
     * revízia 1 = prvé znenie spĺňajúce požiadavky na informovaný súhlas
     *
     * Pozor: hodnota musí zostať nenulová – text lišty obsahuje zástupný
     * reťazec {{revisionMessage}}, ktorý knižnica nahrádza len pri
     * zapnutom verziovaní. Pri revision: 0 by sa vypísal doslovne.
     */
    revision: 1,

    // Súhlas ani jeho odmietnutie neplatí donekonečna – po 6 mesiacoch sa
    // návštevníka opýtame znova.
    cookie: {
      name: "cc_cookie",
      expiresAfterDays: 182,
    },

    guiOptions: {
      consentModal: {
        layout: "box inline",
        position: "bottom left",
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      /**
       * Cookies Google patria doméne google.com, takže ich skript bežiaci
       * na domovrosa.sk technicky nedokáže vymazať (autoClear funguje len
       * na cookies prvej strany). Po odvolaní súhlasu preto zabezpečíme to
       * jediné, čo je v našich silách a čo právne postačuje: mapa sa
       * prestane načítavať a žiadne nové cookies Google nepribudnú.
       * Odstránenie už uložených cookies je popísané v texte lišty.
       */
      functional: {},
    },

    language: {
      default: "sk",
      translations: {
        sk: {
          consentModal: {
            title: "Táto webstránka používa súbory cookies",
            description: `{{revisionMessage}}Súbory cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači. <strong>Nevyhnutné cookies</strong> potrebujeme na to, aby webstránka správne fungovala – tie používame bez vášho súhlasu. <strong>Funkčné cookies</strong> (vložená mapa Google Maps na podstránke Kontakty) používame len vtedy, ak nám na to dáte súhlas; ich príjemcom je spoločnosť Google a údaje môžu byť prenášané mimo EÚ, do USA.
              <br /><br />
              Svoje rozhodnutie môžete <strong>kedykoľvek zmeniť alebo súhlas bezplatne odvolať</strong> – kliknutím na ikonu koláčika v ľavom dolnom rohu stránky alebo na odkaz „Nastavenia cookies“ v pätičke.
              <br /><br />
              V časti „Prispôsobiť“ nájdete <strong>zoznam všetkých konkrétnych súborov cookies</strong> vrátane ich účelu, príjemcu a doby platnosti. Prevádzkovateľom je ${CONTROLLER.name}, ${CONTROLLER.address}; ďalšie informácie o spracúvaní osobných údajov nájdete v dokumente <a href="${COOKIE_INFO_URL}" target="_blank" rel="noopener noreferrer">Zásady spracúvania osobných údajov</a>.`,
            revisionMessage: `<strong>Aktualizovali sme informácie o súboroch cookies.</strong> Prosíme vás preto o opätovné vyjadrenie vašich preferencií.<br /><br />`,
            acceptAllBtn: "Povoliť všetko",
            acceptNecessaryBtn: "Odmietnuť všetko",
            showPreferencesBtn: "Prispôsobiť",
            footer: `<a href="${COOKIE_INFO_URL}" target="_blank" rel="noopener noreferrer">Zásady spracúvania osobných údajov</a>
              <a href="mailto:${CONTROLLER.dpoEmail}">Zodpovedná osoba za ochranu osobných údajov</a>`,
          },
          preferencesModal: {
            title: "Nastavenia súborov cookies",
            acceptAllBtn: "Povoliť všetko",
            acceptNecessaryBtn: "Odmietnuť všetko",
            savePreferencesBtn: "Uložiť nastavenia",
            closeIconLabel: "Zavrieť",
            serviceCounterLabel: "Služby",
            sections: [
              {
                title: "Vaše možnosti ochrany súkromia",
                description: `Nižšie si môžete zapnúť alebo vypnúť jednotlivé kategórie súborov cookies. Kliknutím na názov kategórie sa vám rozbalí <strong>zoznam konkrétnych súborov cookies</strong> v danej kategórii – ich označenie, účel, príjemcu a dobu platnosti.
                  <br /><br />
                  Súhlas je dobrovoľný a môžete ho <strong>kedykoľvek bezplatne odvolať</strong> alebo zmeniť – kliknutím na ikonu koláčika v ľavom dolnom rohu webstránky alebo na odkaz „Nastavenia cookies“ v pätičke. Odvolanie súhlasu nemá vplyv na zákonnosť spracúvania pred jeho odvolaním.
                  <br /><br />
                  <strong>Prevádzkovateľ:</strong> ${CONTROLLER.name}, ${CONTROLLER.address}, IČO: ${CONTROLLER.ico}. <strong>Zodpovedná osoba za ochranu osobných údajov:</strong> ${CONTROLLER.dpoName}, <a href="mailto:${CONTROLLER.dpoEmail}">${CONTROLLER.dpoEmail}</a>.
                  <br /><br />
                  Máte právo na prístup k údajom, ich opravu a výmaz, na obmedzenie spracúvania, na prenosnosť údajov a právo namietať. Pri spracúvaní vašich údajov <strong>nedochádza k automatizovanému rozhodovaniu ani profilovaniu</strong>. Podrobnosti nájdete v dokumente <a href="${COOKIE_INFO_URL}" target="_blank" rel="noopener noreferrer">Zásady spracúvania osobných údajov</a>.
                  <br /><br />
                  Ak sa domnievate, že vaše údaje spracúvame v rozpore s právnymi predpismi, môžete podať podnet alebo sťažnosť dozornému orgánu: <strong>Úrad na ochranu osobných údajov Slovenskej republiky</strong>, Hraničná 12, 820 07 Bratislava 27, tel. +421 2 3231 3220, <a href="https://dataprotection.gov.sk" target="_blank" rel="noopener noreferrer">dataprotection.gov.sk</a>.`,
              },
              {
                title: "Nevyhnutné cookies <span class=\"pm__badge\">Vždy aktívne</span>",
                linkedCategory: "necessary",
                description: `Tieto súbory cookies sú potrebné na základné fungovanie webstránky a na to, aby sme si zapamätali vaše rozhodnutie o cookies. Bez nich by webstránka nefungovala správne. Podľa § 109 ods. 8 zákona č. 452/2021 Z. z. o elektronických komunikáciách sa na ne súhlas nevyžaduje, preto ich nie je možné vypnúť.
                  <br /><br />
                  <strong>Prenos do tretích krajín:</strong> nedochádza k nemu, ide o cookies prvej strany uložené výlučne vo vašom prehliadači.`,
                cookieTable: toCookieTable(NECESSARY_COOKIES),
              },
              {
                title: "Funkčné cookies – mapa Google Maps",
                linkedCategory: "functional",
                description: `Na podstránke <strong>Kontakty</strong> zobrazujeme interaktívnu mapu s našou polohou prostredníctvom služby Google Maps. Ak túto kategóriu povolíte, mapa sa načíta a spoločnosť Google môže vo vašom prehliadači uložiť nižšie uvedené súbory cookies a spracúvať vašu IP adresu. Ak kategóriu nepovolíte, mapa sa nenačíta a namiesto nej zobrazíme odkaz na otvorenie mapy v novom okne.
                  <br /><br />
                  <strong>Ak súhlas odvoláte</strong>, mapu prestaneme načítavať a žiadne ďalšie cookies Google už vo vašom prehliadači nepribudnú. Súbory, ktoré Google uložil skôr, patria doméne google.com a naša webstránka ich technicky nedokáže odstrániť – vymazať ich môžete v nastaveniach svojho prehliadača alebo priamo v <a href="https://myaccount.google.com/" target="_blank" rel="noopener noreferrer">nastaveniach účtu Google</a>.
                  <br /><br />
                  <strong>Príjemca:</strong> Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Írsko; v postavení ďalšieho príjemcu Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA, USA.
                  <br /><br />
                  <strong>Prenos do tretích krajín:</strong> áno – údaje môžu byť prenášané do <strong>USA</strong>. Prenos sa uskutočňuje na základe rozhodnutia Európskej komisie o primeranosti ochrany v rámci <strong>Rámca EÚ – USA pre ochranu osobných údajov (EU–US Data Privacy Framework)</strong>, v ktorom je spoločnosť Google LLC certifikovaná, prípadne na základe štandardných zmluvných doložiek. Podmienky Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.`,
                cookieTable: toCookieTable(FUNCTIONAL_COOKIES),
              },
              {
                title: "Štatistické a marketingové cookies",
                description: `Na tejto webstránke <strong>nepoužívame</strong> žiadne analytické, štatistické ani marketingové či reklamné súbory cookies a nesledujeme správanie návštevníkov. Nepoužívame Google Analytics, reklamné ani profilovacie nástroje a nedochádza k automatizovanému rozhodovaniu ani profilovaniu. Ak by sme takéto nástroje v budúcnosti nasadili, budú doplnené do tohto zoznamu ako samostatná kategória a vyžiadame si na ne váš samostatný súhlas.`,
              },
              {
                title: "Ďalšie informácie",
                description: `Zoznam súborov cookies pravidelne kontrolujeme a aktualizujeme. <strong>Posledná aktualizácia: ${COOKIES_LAST_REVIEW}.</strong>
                  <br /><br />
                  Súbory cookies môžete kedykoľvek vymazať aj priamo v nastaveniach svojho prehliadača. S otázkami k spracúvaniu vašich osobných údajov sa obráťte na zodpovednú osobu ${CONTROLLER.dpoName} na adrese <a href="mailto:${CONTROLLER.dpoEmail}">${CONTROLLER.dpoEmail}</a>, prípadne nás <a href="/kontakty" target="_blank" rel="noopener noreferrer">kontaktujte</a>.`,
              },
            ],
          },
        },
      },
    },
  };
};
