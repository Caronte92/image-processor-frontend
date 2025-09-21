import React from 'react';
import { GlobalStyle } from '@/styles/global';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/theme';

interface IBaseProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }:IBaseProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
