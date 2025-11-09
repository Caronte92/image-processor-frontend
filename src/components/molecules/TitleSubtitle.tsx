import React from 'react';
import styled, { useTheme } from 'styled-components';
import Texts from '@/components/atoms/Texts';
import { Typography } from '@/theme';

const Container = styled.div``;

interface TitleSubtitleProps {
    title: string;
    subtitle: string;
    titleSize?: Typography;
    subtitleSize?: Typography;
}

function _TitleSubtitle(props: TitleSubtitleProps) {
    const theme = useTheme();
    return (
        <Container>
            <Texts
                type={'p'}
                text={props.title}
                size={props.titleSize}
                fontWeight={theme.weights.medium}
                color={theme.colors.foreground}
            />
            <Texts
                type={'p'}
                text={props.subtitle}
                size={props.subtitleSize}
                fontWeight={theme.weights.regular}
                color={theme.colors.mutedForeground}
            />
        </Container>
    );
}

const TitleSubtitleMemo = React.memo(_TitleSubtitle);

export default function TitleSubtitle(props: TitleSubtitleProps) {
    return <TitleSubtitleMemo {...props} />;
}
