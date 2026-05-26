'use client';

import Header from '@/components/organism/header/Header';
import SubMenu from '@/components/organism/header/SubMenu';
import { GlobalStyle } from '@/styles/global';
import React from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const Body = styled.div`
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding-bottom: 5rem;
`;

interface IBaseProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideSubmenu?: boolean;
}

export default function BaseLayout({ ...props }: IBaseProps) {
  return (
    <>
      <GlobalStyle />
      <Container>
        {!props.hideHeader && <Header />}
        {!props.hideSubmenu && <SubMenu />}
        <Body>{props.children}</Body>
      </Container>
    </>
  );
}
