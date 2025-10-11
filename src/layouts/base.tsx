'use client';

import Header from '@/components/section/Header';
import SubMenu from '@/components/section/SubMenu';
import { GlobalStyle } from '@/styles/global';
import React, { useState } from 'react';

interface IBaseProps {
    children: React.ReactNode;
    hideHeader?: boolean;
    hideSubmenu?: boolean;
}

export default function BaseLayout({ children, hideHeader, hideSubmenu }: IBaseProps) {
    const submenuItems = ['svg_react', 'image_converter', 'favicon_generator'];
    const [subMenuItemSelected, setSubMenuItemSelected] = useState<string>(submenuItems[0]);

    const _handleItemSelected = (item: string) => {
        setSubMenuItemSelected(item);
    };

    return (
        <>
            <GlobalStyle />
            {!hideHeader && <Header />}
            {!hideSubmenu && (
                <SubMenu
                    selected={subMenuItemSelected}
                    items={submenuItems}
                    onClickCallback={_handleItemSelected}
                />
            )}
            {children}
        </>
    );
}
