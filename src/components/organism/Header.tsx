import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Texts from '@/components/atoms/Texts';
import { useTranslations } from 'next-intl';
import Button from '../atoms/Button';
import IconWorld from '../atoms/icons/IconWorld';
import IconChebronDown from '../atoms/icons/IconChebronDown';
import IconSun from '../atoms/icons/IconSun';

const HeaderWrapper = styled.header`
    display: flex;
    padding: 1rem;
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
    const theme = useContext(ThemeContext)!;

    return (
        <HeaderWrapper>
            <Container>
                <LogoWrapper>
                    <Logo /> 
                    <TextWrapper>
                        <Texts text={t('title')} type='h1' size={theme.fonts.base} fontWeight={theme.weights.bold} color={''}/>
                        <Texts text={t('subtitle')} type='p' size={theme.fonts.sm} fontWeight={theme.weights.bold} color={''}/>
                    </TextWrapper>
                </LogoWrapper>
                <SettingsWrapper>
                    <Button color={theme.buttonColors.primary} size={theme.buttonSizes.md} onClickCallback={() => console.log('choose language')}>
                        <ButtonWrapper>
                            <IconWorld size={theme.icons.xs}/>
                            <Texts text='Language' type='label' size={theme.fonts.sm} fontWeight={theme.weights.bold} color={''}/>
                            <IconChebronDown size={theme.icons.xs}/>
                        </ButtonWrapper>
                    </Button>
                    <Button color={theme.buttonColors.primary} size={theme.buttonSizes.md} onClickCallback={() => console.log('choose theme')}>
                        <ButtonWrapper>
                            <IconSun size={theme.icons.xs}/>
                        </ButtonWrapper>
                    </Button>
                </SettingsWrapper>
            </Container>
        </HeaderWrapper>
    );
}

const HeaderMemo = React.memo(_Header);
export default function Header() {
    return (
        <HeaderMemo />
    );
}