import React from 'react';
import styled from 'styled-components';
import Texts from '@/components/atoms/Texts';
import { Typography } from '@/components/atoms/Texts';
import { colorVar } from '@/styles/colorVars';
import { fonts } from '@/styles/fonts';

const Container = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  align-items: center;
  gap: ${props => props.$gap || '0'};
`;

interface TitleSubtitleProps {
  title: string;
  subtitle: string;
  titleSize?: Typography;
  subtitleSize?: Typography;
  truncate?: boolean;
  gap?: string;
}

function _TitleSubtitle(props: TitleSubtitleProps) {
  return (
    <Container $gap={props.gap}>
      <Texts
        type={'p'}
        text={props.title}
        size={props.titleSize}
        fontWeight={fonts.weight.medium}
        color={colorVar.foreground}
        truncate={props.truncate}
      />
      <Texts
        type={'p'}
        text={props.subtitle}
        size={props.subtitleSize}
        fontWeight={fonts.weight.normal}
        color={colorVar.mutedForeground}
      />
    </Container>
  );
}

const TitleSubtitleMemo = React.memo(_TitleSubtitle);

export default function TitleSubtitle(props: TitleSubtitleProps) {
  return <TitleSubtitleMemo {...props} />;
}
