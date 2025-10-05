import { getRequestConfig } from 'next-intl/server';
import { i18n, type Locale } from '../i18n-config';

export default getRequestConfig(async ({ locale }) => {
  let validatedLocale: Locale = i18n.defaultLocale;
  
  if (locale && i18n.locales.includes(locale as Locale)) {
    validatedLocale = locale as Locale; // ← Type assertion aquí
  }

  return {
    locale: validatedLocale,
    messages: (await import(`../locales/${validatedLocale}.json`)).default,
  };
});