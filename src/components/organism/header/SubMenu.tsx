'use client';

import Anchor from '@/components/atoms/Anchor';
import IconCode from '@/components/atoms/icons/IconCode';
import IconPicture from '@/components/atoms/icons/IconPicture';
import IconAndText from '@/components/molecules/IconAndText';
import { SubMenuItems } from '@/lib/enums/subMenu';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors?.muted};
  border-block: 1px solid ${props => props.theme.colors?.border};
`;

const SubMenuWrapper = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  margin: 0 auto;
  gap: 1.5rem;
  max-width: 99rem;
`;

const ROUTE_TO_SUBMENU: Record<string, SubMenuItems> = {
  'svg-component': SubMenuItems.SVG_REACT,
  'image-converter': SubMenuItems.IMAGE_CONVERTER,
};

function _SubMenu() {
  const t = useTranslations('SubMenu');
  const theme = useTheme();
  const pathname = usePathname();

  const segments = pathname.split('/');
  const routeSegment = segments[2] || '';
  const selected = ROUTE_TO_SUBMENU[routeSegment] ?? SubMenuItems.SVG_REACT;

  const locale = segments[1];

  return (
    <Container>
      <SubMenuWrapper>
        <Anchor
          href={`/${locale}/svg-component`}
          color={theme.linkColors.ghost}
          text={t(`option_${SubMenuItems.SVG_REACT}`)}
          active={selected === SubMenuItems.SVG_REACT}
        />
        <Anchor
          href={`/${locale}/image-converter`}
          color={theme.linkColors.ghost}
          active={selected === SubMenuItems.IMAGE_CONVERTER}
          text={t(`option_${SubMenuItems.IMAGE_CONVERTER}`)}
        />
      </SubMenuWrapper>
    </Container>
  );
}

const SubMenuMemo = React.memo(_SubMenu);

export default function SubMenu() {
  return <SubMenuMemo />;
}
