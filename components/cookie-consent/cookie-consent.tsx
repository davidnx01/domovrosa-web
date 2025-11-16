"use client";

import "./cookie-consent.css";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import { getCookieConsentConfig } from "./cookie-consent-config";

declare global {
  interface Window {
    _ccRun: boolean;
    dataLayer?: Array<unknown>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function CookieConsentComponent() {
  const searchParams = useSearchParams();
  const openCC = searchParams.get("occ");

  useEffect(() => {
    if (window._ccRun) return;
    window._ccRun = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function (...args: unknown[]) {
        window.dataLayer?.push(args);
      };

    window.gtag?.("consent", "default", {
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
        ad_storage: CookieConsent.acceptedCategory("ads")
          ? "granted"
          : "denied",
        ad_user_data: CookieConsent.acceptedCategory("ads")
          ? "granted"
          : "denied",
        ad_personalization: CookieConsent.acceptedCategory("ads")
          ? "granted"
          : "denied",
        analytics_storage: CookieConsent.acceptedCategory("analytics")
          ? "granted"
          : "denied",
        functionality_storage: CookieConsent.acceptedCategory("functional")
          ? "granted"
          : "denied",
        personalization_storage: CookieConsent.acceptedCategory("functional")
          ? "granted"
          : "denied",
        security_storage: "granted",
      });

      window.dataLayer?.push({
        event: "cookie_consent_update",
      });
    };

    window.addEventListener("cc:onConsent", updateGtagConsent);
    window.addEventListener("cc:onChange", updateGtagConsent);

    CookieConsent.run(getCookieConsentConfig());

    if (openCC === "true") {
      CookieConsent.showPreferences();
      const search = new URLSearchParams(window.location.search);
      search.delete("occ");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${search.toString()}`
      );
    }
  }, [openCC]);

  return null;
}
