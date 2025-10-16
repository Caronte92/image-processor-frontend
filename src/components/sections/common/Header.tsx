import { i18n } from '@/../i18n-config';
import Button from '@/components/atoms/Button';
import IconChevronDown from '@/components/atoms/icons/IconChebronDown';
import IconMoon from '@/components/atoms/icons/IconMoon';
import IconSun from '@/components/atoms/icons/IconSun';
import IconWorld from '@/components/atoms/icons/IconWorld';
import Texts from '@/components/atoms/Texts';
import { useLanguage } from '@/lib/hooks/useLocales';
import { useThemeToggle } from '@/lib/providers/StyledThemeProvider';
import { useTranslations } from 'next-intl';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const HeaderWrapper = styled.header`
    display: flex;
    padding: 1rem;
    background-color: ${props => props.theme.colors?.background || props.theme.background};
    color: ${props => props.theme.colors.foreground};
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

const DropdownWrapper = styled.div`
    background-color: ${props => props.theme.colors?.background || props.theme.background};
    border: 1px solid ${props => props.theme.colors?.border};
    display: flex;
    flex-direction: column;
    position: absolute;
    cursor: pointer;
    border-radius: 0.5rem;
    margin: 1rem 0 0 -0.875rem;
    width: 6.5625rem;
    gap: 0.5rem;
`;

const OptionWrapper = styled.div`
    color: ${({ theme }) => theme.colors.foreground};
    background: 'transparent'
    border: 'transparent';
    padding: .5rem .75rem;

    &:hover {
        background: ${({ theme }) => theme.colors.accent};
    }
`;

function _Header() {
    const t = useTranslations('Navbar');
    const { toggleTheme } = useThemeToggle();
    const theme = useTheme();
    const { currentLocale, changeLanguage } = useLanguage();
    const locales = i18n.locales;
    const currentLanguage = locales.find(lang => lang === currentLocale) || 'en';
    const [isLocalesDropdownVisible, setIsLocalesDropdownVisible] = React.useState(false);

    const handleLanguageChange = (newLocale: string) => {
        changeLanguage(newLocale);
        setIsLocalesDropdownVisible(false);
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
                            fontWeight={theme.weights?.bold}
                            color={theme.colors.mutedForeground}
                        />
                    </TextWrapper>
                </LogoWrapper>
                <SettingsWrapper>
                    <Button
                        color={theme.buttonColors.primary}
                        size={theme.buttonSizes?.md}
                        onClickCallback={() => setIsLocalesDropdownVisible(!isLocalesDropdownVisible)}
                    >
                        <ButtonWrapper>
                            <IconWorld size={theme.icons.xs} />
                            <Texts
                                text={currentLanguage.toUpperCase()}
                                type="p"
                                size={theme.fonts?.sm}
                                fontWeight={theme.weights?.bold}
                                color={theme.colors?.foreground}
                            />
                            <IconChevronDown size={theme.icons.xs} />
                        </ButtonWrapper>
                        {isLocalesDropdownVisible && (
                            <DropdownWrapper>
                                {locales.map(locale => (
                                    <OptionWrapper key={locale} onClick={() => handleLanguageChange(locale)}>
                                        <ButtonWrapper>
                                            <Texts
                                                text={locale.toUpperCase()}
                                                type="p"
                                                size={theme.fonts?.sm}
                                                fontWeight={theme.weights?.bold}
                                                color={theme.colors?.foreground}
                                            />
                                        </ButtonWrapper>
                                    </OptionWrapper>
                                ))}
                            </DropdownWrapper>
                        )}
                    </Button>
                    <Button
                        color={theme.buttonColors.primary}
                        size={theme.buttonSizes?.md}
                        onClickCallback={toggleTheme}
                    >
                        <ButtonWrapper>
                            {theme.mode == 'light' ? (
                                <IconSun size={theme.icons.xs} />
                            ) : (
                                <IconMoon size={theme.icons.xs} />
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
