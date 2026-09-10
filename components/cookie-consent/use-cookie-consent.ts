"use client";

import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

/**
 * Vráti, či návštevník udelil súhlas s danou kategóriou cookies.
 * Hodnota sa automaticky aktualizuje, keď návštevník svoje preferencie
 * zmení alebo súhlas odvolá.
 */
export function useCookieConsent(category: string) {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const sync = () => {
      try {
        setAccepted(CookieConsent.acceptedCategory(category));
      } catch {
        setAccepted(false);
      }
    };

    sync();

    window.addEventListener("cc:onConsent", sync);
    window.addEventListener("cc:onChange", sync);

    return () => {
      window.removeEventListener("cc:onConsent", sync);
      window.removeEventListener("cc:onChange", sync);
    };
  }, [category]);

  return accepted;
}
