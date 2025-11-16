import type { CookieConsentConfig } from "vanilla-cookieconsent";

export const getCookieConsentConfig = () => {
  const config: CookieConsentConfig = {
    // root: 'body',
    disablePageInteraction: true,
    autoShow: true,
    hideFromBots: true,
    mode: "opt-in",
    // revision: 0,

    /**
     * Callback functions
     */
    // onFirstConsent: ({ cookie }) => {
    //   console.log('onFirstConsent fired', cookie);
    // },

    // onConsent: ({ cookie }) => {
    //   console.log('onConsent fired!', cookie);
    // },

    // onChange: ({ changedCategories, changedServices }) => {
    //   console.log('onChange fired!', changedCategories, changedServices);
    // },

    // onModalReady: ({ modalName }) => {
    //   console.log('ready:', modalName);
    // },

    // onModalShow: ({ modalName }) => {
    //   console.log('visible:', modalName);
    // },

    // onModalHide: ({ modalName }) => {
    //   console.log('hidden:', modalName);
    // },

    // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
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
        enabled: true, // this category is enabled by default
        readOnly: true, // this category cannot be disabled
      },
      analytics: {},
      ads: {},
      functional: {},
    },

    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "Táto webstránka používa súbory cookies",
            description:
              "Na prispôsobenie obsahu a reklám, poskytovanie funkcií sociálnych médií a analýzu návštevnosti používame súbory cookie. Informácie o tom, ako používate naše webové stránky, poskytujeme aj našim partnerom v oblasti sociálnych médií, inzercie a analýzy. Títo partneri môžu príslušné informácie skombinovať s ďalšími údajmi, ktoré ste im poskytli alebo ktoré od vás získali, keď ste používali ich služby.",
            acceptAllBtn: "Povoliť všetko",
            acceptNecessaryBtn: "Odmietnuť",
            showPreferencesBtn: "Prispôsobiť",
            // closeIconLabel: 'Reject all and close modal',
            // footer: `
            //             // <a href="#path-to-impressum.html" target="_blank">Impressum</a>
            //             // <a href="${ROUTES.}" target="_blank">Privacy Policy</a>
            //         `,
          },
          preferencesModal: {
            title: "Nastavenie cookies",
            acceptAllBtn: "Povoliť všetko",
            acceptNecessaryBtn: "Odmietnuť",
            savePreferencesBtn: "Uložiť nastavenia",
            closeIconLabel: "Zavrieť",
            serviceCounterLabel: "Služby",
            sections: [
              {
                title: "Vaše možnosti ochrany súkromia",
                description:
                  "V tejto časti môžete vyjadriť niektoré preferencie týkajúce sa spracovania vašich osobných údajov. Možete kedykoľvek preskúmať a zmeniť vyjadrené voľby tým, že znovu zobrazíte tento panel prostredníctvom poskytnutého odkazu. Ak chcete odmietnuť svoj súhlas so špecifickými činnosťami spracovania opísanými nižšie, prepínače prepnite na vypnuté alebo použite tlačidlo „Odmietnuť všetko“ a potvrďte, že chcete uložiť svoje voľby.",
              },
              {
                title: "Potrebné",
                description:
                  "Potrebné súbory cookie pomáhajú vytvárať použiteľné webové stránky tak, že umožňujú základné funkcie, ako je navigácia stránky a prístup k chráneným oblastiam webových stránok. Webové stránky nemôžu riadne fungovať bez týchto súborov cookies.",
                //this field will generate a toggle linked to the 'necessary' category
                linkedCategory: "necessary",
              },
              {
                title: "Funkčné", //sk - 'Funkčné'
                description:
                  "Funkčné súbory cookie pomáhajú vykonávať určité funkcie, ako je zdieľanie obsahu webovej stránky na platformách sociálnych médií, zbieranie spätnej väzby a ďalšie funkcie tretích strán.",
                //sk - 'Funkčné súbory cookie pomáhajú vykonávať určité funkcie, ako je zdieľanie obsahu webovej stránky na platformách sociálnych médií, zbieranie spätnej väzby a ďalšie funkcie tretích strán.',
                linkedCategory: "functional",
              },
              {
                title: "Štatistiky a analýzy",
                description:
                  "Štatistické súbory cookies pomáhajú majiteľom webových stránok, aby pochopili, ako komunikovať s návštevníkmi webových stránok prostredníctvom zberu a hlásenia informácií anonymne.",
                linkedCategory: "analytics",
                // cookieTable: {
                //   caption: t('text1007'),
                //   headers: {
                //     name: t('text1008'),
                //     domain: t('text1009'),
                //   },
                //   body: [
                //     {
                //       name: '_ga',
                //       domain: location.hostname,
                //     },
                //   ],
                // },
              },
              {
                title: "Marketing",
                description:
                  "Marketingové súbory cookies sa používajú na sledovanie návštevníkov na webových stránkach. Zámerom je zobrazovať reklamy, ktoré sú relevantné a pútavé pre jednotlivých užívateľov, a tým cennejšie pre vydavateľov a inzerentov tretích strán.",
                linkedCategory: "ads",
                // cookieTable: {
                //   caption: t('text1007'),;
                //   headers: {
                //     name: t('text1008'),
                //     domain: t('text1009'),
                //   },
                //   body: [
                //     {
                //       name: '_fbp',
                //       domain: location.hostname,
                //     },
                //   ],
                // },
              },
              {
                title: "Chcem vedieť viac",
                description: `Pre získanie informácií o spracovaní osobných údajov a vašich právach v súvislosti s ochranou osobných údajov, nás môžte kontaktovať <a href="/kontakty" target="_blank">Kontakty</a>`,
              },
            ],
          },
        },
      },
    },
  };

  return config;
};
