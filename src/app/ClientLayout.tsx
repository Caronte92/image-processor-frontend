'use client';

import StyledComponentsRegistry from '@/lib/providers/StyledComponentsRegistry';
import StyledThemeProvider from '@/lib/providers/StyledThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
  messages: Record<string, string>;
  locale: string;
  initialThemeMode: 'light' | 'dark';
}

export default function ClientLayout({
  children,
  messages,
  locale,
  initialThemeMode,
}: ClientLayoutProps) {
  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone="Europe/Madrid"
    >
      <StyledComponentsRegistry>
        <StyledThemeProvider initialThemeMode={initialThemeMode}>
          {children}
        </StyledThemeProvider>
      </StyledComponentsRegistry>
    </NextIntlClientProvider>
  );
}
