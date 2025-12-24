'use client';

import { i18n } from '@/../i18n-config';
import Button from '@/components/atoms/Button';
import IconMoon from '@/components/atoms/icons/IconMoon';
import IconSun from '@/components/atoms/icons/IconSun';
import IconWorld from '@/components/atoms/icons/IconWorld';
import Texts from '@/components/atoms/Texts';
import Select from '@/components/molecules/Select';
import { useLanguage } from '@/lib/hooks/useLocales';
import { useThemeToggle } from '@/lib/providers/StyledThemeProvider';
import { useTranslations } from 'next-intl';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors?.card};
  color: ${({ theme }) => theme.colors.foreground};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 99rem;
  margin: 0 auto;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: tomato;
  border-radius: 0.625rem;
`;

const SettingsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-items: stretch;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

function _Header() {
  const t = useTranslations('Navbar');
  const { toggleTheme } = useThemeToggle();
  const theme = useTheme();
  const { currentLocale, changeLanguage } = useLanguage();
  const locales = i18n.locales;
  const currentLanguage = locales.find(lang => lang === currentLocale) || 'en';

  const handleLanguageChange = (newLocale: string) => {
    changeLanguage(newLocale);
  };

  return (
    <HeaderWrapper>
      <Container>
        <LogoWrapper>
          <Logo />
          <TextWrapper>
            <Texts
              text={t('title')}
              type="h1"
              size={theme.fonts?.base}
              fontWeight={theme.weights?.bold}
              color={theme.colors.foreground}
            />
            <Texts
              text={t('subtitle')}
              type="p"
              size={theme.fonts?.sm}
              fontWeight={theme.weights?.regular}
              color={theme.colors.mutedForeground}
            />
          </TextWrapper>
        </LogoWrapper>
        <SettingsWrapper>
          <Select
            text={currentLanguage.toUpperCase()}
            icon={<IconWorld size={theme.icons.xs} stroke={theme.colors.mutedForeground} />}
            options={locales.map(locale => ({
              text: locale.toUpperCase(),
              value: locale,
              selected: locale === currentLocale,
            }))}
            onclickCallback={event => {
              const value = event.currentTarget.dataset.value;
              if (value) handleLanguageChange(value);
            }}
            hideBorder
            children={undefined}
            size={theme.buttonSizes?.md}
            color={theme.buttonColors.ghost}
          />
          <Button color={theme.buttonColors.ghost} size={theme.buttonSizes?.md} onClickCallback={toggleTheme}>
            <ButtonWrapper>
              {theme.mode == 'light' ? (
                <IconMoon size={theme.icons.xs} stroke={theme.colors.foreground} />
              ) : (
                <IconSun size={theme.icons.xs} stroke={theme.colors.foreground} />
              )}
            </ButtonWrapper>
          </Button>
        </SettingsWrapper>
      </Container>
    </HeaderWrapper>
  );
}

const HeaderMemo = React.memo(_Header);
export default function Header() {
  return <HeaderMemo />;
}
