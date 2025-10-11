'use client';

import React from 'react';
import { GlobalStyle } from '@/styles/global';
import Header from '@/components/organism/Header';

interface IBaseProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

export default function BaseLayout({ children, hideHeader }:IBaseProps) {
  return (
    <>
      <GlobalStyle />
      {!hideHeader && <Header />}
      {children}
    </>
  );
}
