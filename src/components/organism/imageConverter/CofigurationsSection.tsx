import Texts from '@/components/atoms/Texts';
import Wrapper from '@/components/atoms/Wrapper';
import { useTranslations } from 'next-intl';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const TitleWrapper = styled.div`
    display: flex;
    gap: .5rem;
`;

function _ConfigurationsSection() {
    const t = useTranslations('ImageConverter');
    const theme = useTheme();
    return (
        <Wrapper>
            <TitleWrapper>
                <Texts text={t('configuration_section_title')} color={theme.colors.cardForeground} />
            </TitleWrapper>
        </Wrapper>
    );
};

const ConfigurationsSectionMemo = React.memo(_ConfigurationsSection);

export default function ConfigurationsSection() {
    return (
        <ConfigurationsSectionMemo />
    );
}