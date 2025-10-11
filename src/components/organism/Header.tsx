'use client';

import React from 'react';
import styled, { useTheme } from 'styled-components';
import Texts from '@/components/atoms/Texts';
import { useTranslations } from 'next-intl';
import Button from '../atoms/Button';
import IconWorld from '../atoms/icons/IconWorld';
import IconChebronDown from '../atoms/icons/IconChebronDown';
import IconSun from '../atoms/icons/IconSun';
import { useThemeToggle } from '@/lib/providers/StyledThemeProvider';
import IconMoon from '../atoms/icons/IconMoon';

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
    gap: .5rem;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Logo = styled.div`
    width: 2rem;
    height: 2rem;
    background-color: tomato;
    border-radius: .625rem;
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
    gap: .5rem;
`;

function _Header() {
    const t = useTranslations('Navbar');
    const { toggleTheme } = useThemeToggle();
    const theme = useTheme();
    console.log(theme);
    return (
        <HeaderWrapper>
            <Container>
                <LogoWrapper>
                    <Logo /> 
                    <TextWrapper>
                        <Texts 
                            text={t('title')} 
                            type='h1' 
                            size={theme.fonts?.base} 
                            fontWeight={theme.weights?.bold} 
                            color={theme.colors.foreground}
                        />
                        <Texts 
                            text={t('subtitle')} 
                            type='p' 
                            size={theme.fonts?.sm} 
                            fontWeight={theme.weights?.bold} 
                            color={theme.colors.mutedForeground}
                        />
                    </TextWrapper>
                </LogoWrapper>
                <SettingsWrapper>
                    <Button color={theme.buttonColors.primary} size={theme.buttonSizes?.md} onClickCallback={() => console.log('choose language')}>
                        <ButtonWrapper>
                            <IconWorld size={theme.icons.xs}/>
                            <Texts 
                                text='Language' 
                                type='p' 
                                size={theme.fonts?.sm} 
                                fontWeight={theme.weights?.bold} 
                                color={theme.colors?.foreground}
                            />
                            <IconChebronDown size={theme.icons.xs}/>
                        </ButtonWrapper>
                    </Button>
                    <Button color={theme.buttonColors.primary} size={theme.buttonSizes?.md} onClickCallback={toggleTheme}>
                        <ButtonWrapper>
                            { theme.mode == 'light' ? 
                                <IconSun size={theme.icons.xs}/> :
                                <IconMoon size={theme.icons.xs}/>
                            }
                            
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