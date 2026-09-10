"use client";

import "vanilla-cookieconsent/dist/cookieconsent.css";
// Vlastné štýly musia byť načítané až po štýloch knižnice.
import "./cookie-consent.css";
import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import { getCookieConsentConfig } from "./cookie-consent-config";
import { CookieConsentFab } from "./cookie-consent-fab";

declare global {
  interface Window {
    _ccRun: boolean;
    dataLayer?: Array<unknown>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function CookieConsentComponent() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    listenForConsent();
    CookieConsent.run(getCookieConsentConfig());

    // Podpora priameho odkazu ?occ=true (napr. z e-mailu alebo z iného
    // dokumentu) na otvorenie nastavení cookies.
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("occ") === "true") {
      CookieConsent.showPreferences();
      searchParams.delete("occ");
      const query = searchParams.toString();
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}${query ? `?${query}` : ""}`
      );
    }
  }, [isInitialized]);

  return <CookieConsentFab />;
}

const listenForConsent = () => {
  if (window._ccRun) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

  // Predvolene je všetko zamietnuté, kým návštevník neudelí súhlas.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500,
  });

  const updateGtagConsent = () => {
    window.gtag?.("consent", "update", {
      // Analytické ani reklamné cookies na webe nepoužívame – zostávajú
      // natrvalo zamietnuté. Pri ich prípadnom nasadení stačí doplniť
      // príslušné kategórie do konfigurácie cookie lišty.
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: CookieConsent.acceptedCategory("functional")
        ? "granted"
        : "denied",
      personalization_storage: CookieConsent.acceptedCategory("functional")
        ? "granted"
        : "denied",
      security_storage: "granted", // nevyhnutné
    });
    window.dataLayer?.push({
      event: "cookie_consent_update",
    });
  };

  window.addEventListener("cc:onConsent", () => {
    updateGtagConsent();
  });

  window.addEventListener("cc:onChange", () => {
    updateGtagConsent();
  });
};
