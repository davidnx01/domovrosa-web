"use client";

import { useEffect, useState } from "react";
import { LuCookie } from "react-icons/lu";
import * as CookieConsent from "vanilla-cookieconsent";
import { Button } from "../ui/button";

/**
 * Trvalo prítomná ikona v ľavom dolnom rohu, ktorou môže návštevník
 * kedykoľvek znovu vyvolať cookie lištu, zmeniť svoje preferencie
 * a odvolať už udelený súhlas.
 */
export function CookieConsentFab() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Button
      type="button"
      onClick={() => CookieConsent.showPreferences()}
      variant="default"
      size="icon"
      aria-label="Nastavenia súborov cookies"
      title="Nastavenia súborov cookies"
      className="fixed bottom-16 left-4 z-[1000] rounded-full shadow-2xl sm:bottom-8"
    >
      <LuCookie size={24} aria-hidden="true" />
    </Button>
  );
}
