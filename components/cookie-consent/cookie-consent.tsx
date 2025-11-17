'use client';

import './cookie-consent.css';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import { getCookieConsentConfig } from './cookie-consent-config';

declare global {
  interface Window {
    _ccRun: boolean;
    dataLayer?: Array<unknown>;
    gtag?: (...args: unknown[]) => void;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CookieConsentComponent() {
  const searchParams = useSearchParams();
  const openCC = searchParams.get('occ');

   const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    listenForConsent();
    CookieConsent.run(getCookieConsentConfig());

    if (openCC === 'true') {
      CookieConsent.showPreferences();
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete('occ');
      window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, openCC]);

  return <></>;
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

  // isGtag &&
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500, // Add this line
  });

  const updateGtagConsent = () => {
    // if (!isGtag) return;
    window.gtag('consent', 'update', {
      ad_storage: CookieConsent.acceptedCategory('ads') ? 'granted' : 'denied',
      ad_user_data: CookieConsent.acceptedCategory('ads') ? 'granted' : 'denied',
      ad_personalization: CookieConsent.acceptedCategory('ads') ? 'granted' : 'denied',
      analytics_storage: CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied',
      functionality_storage: CookieConsent.acceptedCategory('functional') ? 'granted' : 'denied',
      personalization_storage: CookieConsent.acceptedCategory('functional') ? 'granted' : 'denied',
      security_storage: 'granted', //necessary
    });
    window.dataLayer?.push({
      event: 'cookie_consent_update',
    });
  };

  window.addEventListener('cc:onConsent', () => {
    updateGtagConsent();
  });

  window.addEventListener('cc:onChange', () => {
    updateGtagConsent();
  });
};
