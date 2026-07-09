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
import styled from 'styled-components';
import { colorVar } from '@/styles/colorVars';
import { fonts } from '@/styles/fonts';
import { icons } from '@/styles/icons';
import { buttonSizes, buttonStyles } from '@/styles/buttons';

const HeaderWrapper = styled.header`
  display: flex;
  padding: 1rem;
  background-color: ${colorVar.card};
  color: ${colorVar.foreground};
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
  const { themeMode, toggleTheme } = useThemeToggle();
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
                fontSize: fonts.size.base,
                lineHeight: fonts.lineHeight.base,
              }}
              fontWeight={fonts.weight.bold}
              color={colorVar.foreground}
            />
            <Texts
              text={t('subtitle')}
              type="p"
              size={{
                fontSize: fonts.size.sm,
                lineHeight: fonts.lineHeight.sm,
              }}
              fontWeight={fonts.weight.normal}
              color={colorVar.mutedForeground}
            />
          </TextWrapper>
        </LogoWrapper>
        <SettingsWrapper>
          <Select
            text={currentLanguage.toUpperCase()}
            icon={
              <IconWorld
                size={icons.size.xs}
                stroke={colorVar.mutedForeground}
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
            size={buttonSizes.md}
            color={buttonStyles.ghost}
          />
          <Toggle
            onToggle={toggleTheme}
            icon={
              themeMode === 'light' ? (
                <IconMoon size={icons.size.xs} stroke={colorVar.foreground} />
              ) : (
                <IconSun size={icons.size.xs} stroke={colorVar.primary} />
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
