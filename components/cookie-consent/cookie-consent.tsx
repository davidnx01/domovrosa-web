'use client';

import './cookie-consent.css';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import { getCookieConsentConfig } from './cookie-consent-config';

/* -----------------------------------------------
   GLOBAL TYPES (strict, ESLint-safe)
------------------------------------------------ */
declare global {
  interface Window {
    _ccRun: boolean;
    dataLayer?: Array<unknown>;
    gtag?: (...args: unknown[]) => void;
  }
}

/* -----------------------------------------------
   INITIALIZATION GUARD
------------------------------------------------ */
let isInitialized = false;
if (typeof window !== 'undefined') {
  isInitialized = true;
}

/* -----------------------------------------------
   MAIN COOKIE CONSENT COMPONENT
------------------------------------------------ */
export function CookieConsentComponent() {
  const searchParams = useSearchParams();
  const openCC = searchParams.get('occ');

  useEffect(() => {
    if (!isInitialized) return;

    listenForConsent();
    CookieConsent.run(getCookieConsentConfig());

    // Open preferences if occ=true
    if (openCC === 'true') {
      CookieConsent.showPreferences();

      const search = new URLSearchParams(window.location.search);
      search.delete('occ');
      window.history.pushState({}, '', `${window.location.pathname}?${search.toString()}`);
    }
  }, [openCC]);

  return null;
}

/* -----------------------------------------------
   CONSENT LISTENER + GTM/GA4 INTEGRATION
------------------------------------------------ */
const listenForConsent = () => {
  if (window._ccRun) return;
  window._ccRun = true;

  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];

  // Setup GTAG fallback safely
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  // Default consent state
  window.gtag?.('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500,
  });

  // Update consent → GA4 + GTM
  const updateGtagConsent = () => {
    window.gtag?.('consent', 'update', {
      ad_storage: CookieConsent.acceptedCategory('ads') ? 'granted' : 'denied',
      ad_user_data: CookieConsent.acceptedCategory('ads') ? 'granted' : 'denied',
      ad_personalization: CookieConsent.acceptedCategory('ads') ? 'granted' : 'denied',
      analytics_storage: CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied',
      functionality_storage: CookieConsent.acceptedCategory('functional') ? 'granted' : 'denied',
      personalization_storage: CookieConsent.acceptedCategory('functional') ? 'granted' : 'denied',
      security_storage: 'granted',
    });

    window.dataLayer?.push({
      event: 'cookie_consent_update',
    });
  };

  // Listen for CookieConsent events
  window.addEventListener('cc:onConsent', updateGtagConsent);
  window.addEventListener('cc:onChange', updateGtagConsent);
};
