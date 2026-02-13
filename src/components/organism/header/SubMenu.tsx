'use client';

import Button from '@/components/atoms/Button';
import IconCode from '@/components/atoms/icons/IconCode';
import IconPicture from '@/components/atoms/icons/IconPicture';
import IconAndText from '@/components/molecules/IconAndText';
import { SubMenuItems } from '@/lib/enums/subMenu';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors?.muted};
  border-block: 1px solid ${props => props.theme.colors?.border};
`;

const SubMenuWrapper = styled.div`
  display: flex;
  padding: 0 1rem;
  margin: 0 auto;
  gap: 0.5rem;
  max-width: 99rem;
`;

interface SubMenuProps {
  selected: string;
  onClickCallback: (item: string) => void;
}

function _SubMenu({ ...props }: SubMenuProps) {
  const t = useTranslations('SubMenu');
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleSvgReactClick = () => {
    const locale = pathname.split('/')[1];
    router.push(`/${locale}/svg-component`);
  };

  const handleImageConverterClick = () => {
    const locale = pathname.split('/')[1];
    router.push(`/${locale}/image-converter`);
  };

  return (
    <Container>
      <SubMenuWrapper>
        <Button
          color={theme.buttonColors.ghost}
          size={theme.buttonSizes.md}
          selected={props.selected === SubMenuItems.SVG_REACT}
          hideBorder={true}
          onClickCallback={handleSvgReactClick}
          data-item={SubMenuItems.SVG_REACT}
        >
          <IconAndText
            icon={<IconCode size={theme.icons.xs} />}
            text={t(`option_${SubMenuItems.SVG_REACT}`)}
            size={theme.fonts.sm}
            color={theme.colors.foreground}
            fontWeight={theme.weights.medium}
          />
        </Button>
        <Button
          color={theme.buttonColors.ghost}
          size={theme.buttonSizes.md}
          selected={props.selected === SubMenuItems.IMAGE_CONVERTER}
          hideBorder={true}
          onClickCallback={handleImageConverterClick}
          data-item={SubMenuItems.IMAGE_CONVERTER}
        >
          <IconAndText
            icon={<IconPicture size={theme.icons.xs} />}
            text={t(`option_${SubMenuItems.IMAGE_CONVERTER}`)}
            size={theme.fonts.sm}
            color={theme.colors.foreground}
            fontWeight={theme.weights.medium}
          />
        </Button>
      </SubMenuWrapper>
    </Container>
  );
}

const SubMenuMemo = React.memo(_SubMenu);

export default function SubMenu(props: SubMenuProps) {
  return <SubMenuMemo {...props} />;
}
