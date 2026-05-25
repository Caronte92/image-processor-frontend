'use client';

import { i18n } from '@/../i18n-config';
import IconMoon from '@/components/atoms/icons/IconMoon';
import IconSun from '@/components/atoms/icons/IconSun';
import IconWorld from '@/components/atoms/icons/IconWorld';
import Texts from '@/components/atoms/Texts';
import Toggle from '@/components/atoms/Toggle';
import Select from '@/components/molecules/Select';
import { useLanguage } from '@/lib/hooks/useLocales';
import { useThemeToggle } from '@/lib/providers/StyledThemeProvider';
import { useTranslations } from 'next-intl';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.foreground};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const SettingsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-items: stretch;
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
          <TextWrapper>
            <Texts
              text={t('title')}
              type="h1"
              size={{
                fontSize: theme.fonts.size.base,
                lineHeight: theme.fonts.lineHeight.base,
              }}
              fontWeight={theme.fonts.weight.bold}
              color={theme.colors.foreground}
            />
            <Texts
              text={t('subtitle')}
              type="p"
              size={{
                fontSize: theme.fonts.size.sm,
                lineHeight: theme.fonts.lineHeight.sm,
              }}
              fontWeight={theme.fonts.weight.normal}
              color={theme.colors.mutedForeground}
            />
          </TextWrapper>
        </LogoWrapper>
        <SettingsWrapper>
          <Select
            text={currentLanguage.toUpperCase()}
            icon={
              <IconWorld
                size={theme.icons.size.xs}
                stroke={theme.colors.mutedForeground}
              />
            }
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
            size={theme.buttonSizes.md}
            color={theme.buttonColors.ghost}
          />
          <Toggle
            onToggle={toggleTheme}
            icon={
              theme.mode == 'light' ? (
                <IconMoon
                  size={theme.icons.size.xs}
                  stroke={theme.colors.foreground}
                />
              ) : (
                <IconSun
                  size={theme.icons.size.xs}
                  stroke={theme.colors.primary}
                />
              )
            }
          />
        </SettingsWrapper>
      </Container>
    </HeaderWrapper>
  );
}

const HeaderMemo = React.memo(_Header);
export default function Header() {
  return <HeaderMemo />;
}
