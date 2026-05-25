import Texts from '@/components/atoms/Texts';
import { Typography } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ $gap: string }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$gap};
`;

const IconWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: fit-content;
  height: fit-content;
`;

interface IconAndTextProps {
  text: string;
  size?: Typography;
  color: string;
  fontWeight?: string;
  icon: React.ReactNode;
  gap?: string;
}

function _IconAndText({ gap = '1rem', ...props }: IconAndTextProps) {
  return (
    <Container $gap={gap}>
      <IconWrapper>{props.icon}</IconWrapper>
      <Texts
        text={props.text}
        size={props.size}
        color={props.color}
        fontWeight={props.fontWeight}
      />
    </Container>
  );
}

const IconAndTextMemo = React.memo(_IconAndText);

export default function IconAndText(props: IconAndTextProps) {
  return <IconAndTextMemo {...props} />;
}
