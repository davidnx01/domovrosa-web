import type { CookieConsentConfig } from "vanilla-cookieconsent";

export const getCookieConsentConfig = (): CookieConsentConfig => {
  return {
    autoShow: true,
    disablePageInteraction: true,
    hideFromBots: true,
    mode: "opt-in",

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
              "Na prispôsobenie obsahu a reklám, poskytovanie funkcií sociálnych médií a analýzu návštevnosti používame súbory cookie.",
            acceptAllBtn: "Povoliť všetko",
            acceptNecessaryBtn: "Odmietnuť",
            showPreferencesBtn: "Prispôsobiť",
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
                  "V tejto časti môžete vyjadriť niektoré preferencie týkajúce sa spracovania vašich osobných údajov.",
              },
              {
                title: "Potrebné",
                linkedCategory: "necessary",
                description:
                  "Tieto súbory cookie sú potrebné pre správne fungovanie webstránky.",
              },
              {
                title: "Funkčné",
                linkedCategory: "functional",
                description:
                  "Funkčné cookies umožňujú pokročilé funkcie a personalizáciu.",
              },
              {
                title: "Štatistiky a analýzy",
                linkedCategory: "analytics",
                description:
                  "Štatistické cookies zbierajú anonymné dáta na zlepšovanie webu.",
              },
              {
                title: "Marketing",
                linkedCategory: "ads",
                description:
                  "Marketingové cookies sa používajú pre cieľenú reklamu.",
              },
              {
                title: "Chcem vedieť viac",
                description: `Pre viac informácií <a href="/kontakty" target="_blank">kontaktujte nás</a>.`,
              },
            ],
          },
        },
      },
    },
  };
};
