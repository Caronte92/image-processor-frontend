'use client';

import React from 'react';
import { GlobalStyle } from '@/styles/global';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/theme';
import Header from '@/components/organism/Header';

interface IBaseProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

export default function BaseLayout({ children, hideHeader }:IBaseProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {!hideHeader && <Header />}
      {children}
    </ThemeProvider>
  );
}
