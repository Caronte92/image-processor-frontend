import Checkbox from '@/components/atoms/Checkbox';
import Texts from '@/components/atoms/Texts';
import { Typography } from '@/styles/theme';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const Container = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
`;

interface CheckboxAndLabelProps {
  label: string;
  checked: boolean;
  size?: Typography;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function _CheckboxAndLabel(props: CheckboxAndLabelProps) {
  const theme = useTheme();
  return (
    <Container>
      <Checkbox checked={props.checked} onChange={props.onChange} />
      <Texts
        text={props.label}
        size={props.size ?? theme.fonts.sm}
        color={theme.colors.cardForeground}
      />
    </Container>
  );
}

const CheckboxAndLabelMemo = React.memo(_CheckboxAndLabel);

export default function CheckboxAndLabel(props: CheckboxAndLabelProps) {
  return <CheckboxAndLabelMemo {...props} />;
}
