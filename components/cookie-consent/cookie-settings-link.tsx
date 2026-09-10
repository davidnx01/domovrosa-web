"use client";

import * as CookieConsent from "vanilla-cookieconsent";

/**
 * Textový odkaz do pätičky, ktorým je možné kedykoľvek znovu otvoriť
 * cookie lištu a zmeniť alebo odvolať udelený súhlas.
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          CookieConsent.showPreferences();
        } catch {
          // Lišta ešte nebola inicializovaná – prejdeme na URL, ktorá ju otvorí.
          window.location.href = `${window.location.pathname}?occ=true`;
        }
      }}
      className={className}
    >
      Nastavenia cookies
    </button>
  );
}
