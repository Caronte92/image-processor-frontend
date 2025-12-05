'use client';

import Header from '@/components/template/common/Header';
import SubMenu from '@/components/template/common/SubMenu';
import { SubMenuItems } from '@/lib/enums/subMenu';
import { SubmenuProvider } from '@/lib/providers/SubmenuProvider';
import { GlobalStyle } from '@/styles/global';
import React, { useState } from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
`;

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
            <Container>
                {!hideHeader && <Header />}
                <SubmenuProvider
                    items={submenuItems}
                    selected={subMenuItemSelected}
                    setSelected={setSubMenuItemSelected}
                >
                    {!hideSubmenu && (
                        <SubMenu
                            selected={subMenuItemSelected}
                            onClickCallback={_handleItemSelected}
                        />
                    )}
                    {children}
                </SubmenuProvider>
            </Container>
        </>
    );
}
