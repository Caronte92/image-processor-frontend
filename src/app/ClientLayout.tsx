'use client';

import StyledThemeProvider from '@/lib/providers/StyledThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
  messages: Record<string, string>;
  locale: string;
}

export default function ClientLayout({ children, messages, locale }: ClientLayoutProps) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone="Europe/Madrid">
      <StyledThemeProvider>{children}</StyledThemeProvider>
    </NextIntlClientProvider>
  );
}
