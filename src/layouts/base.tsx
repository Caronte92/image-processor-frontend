'use client';

import Header from '@/components/sections/common/Header';
import SubMenu from '@/components/sections/common/SubMenu';
import { SubMenuItems } from '@/lib/enums/subMenu';
import { SubmenuProvider } from '@/lib/providers/SubmenuProvider';
import { GlobalStyle } from '@/styles/global';
import React, { useState } from 'react';

interface IBaseProps {
    children: React.ReactNode;
    hideHeader?: boolean;
    hideSubmenu?: boolean;
}

export default function BaseLayout({ children, hideHeader, hideSubmenu }: IBaseProps) {
    const submenuItems = [SubMenuItems.SVG_REACT, SubMenuItems.IMAGE_CONVERTER, SubMenuItems.FAVICON_GENERATOR];
    const [subMenuItemSelected, setSubMenuItemSelected] = useState<string>(submenuItems[0]);

    const _handleItemSelected = (item: string) => {
        setSubMenuItemSelected(item);
    };

    return (
        <>
            <GlobalStyle />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
                {!hideHeader && <Header />}
                <SubmenuProvider
                    items={submenuItems}
                    selected={subMenuItemSelected}
                    setSelected={setSubMenuItemSelected}
                >
                    {!hideSubmenu && (
                        <SubMenu
                            selected={subMenuItemSelected}
                            items={submenuItems}
                            onClickCallback={_handleItemSelected}
                        />
                    )}
                    {children}
                </SubmenuProvider>
            </div>
        </>
    );
}
