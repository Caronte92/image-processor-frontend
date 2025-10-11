'use client';

import Header from '@/components/organism/Header';
import { GlobalStyle } from '@/styles/global';
import React from 'react';

interface IBaseProps {
    children: React.ReactNode;
    hideHeader?: boolean;
}

export default function BaseLayout({ children, hideHeader }: IBaseProps) {
    return (
        <>
            <GlobalStyle />
            {!hideHeader && <Header />}
            {children}
        </>
    );
}
