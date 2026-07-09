import Checkbox from '@/components/atoms/Checkbox';
import Texts from '@/components/atoms/Texts';
import { Typography } from '@/components/atoms/Texts';
import React from 'react';
import styled from 'styled-components';
import { colorVar } from '@/styles/colorVars';
import { fonts } from '@/styles/fonts';

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
  return (
    <Container>
      <Checkbox checked={props.checked} onChange={props.onChange} />
      <Texts
        text={props.label}
        size={
          props.size ?? {
            fontSize: fonts.size.sm,
            lineHeight: fonts.lineHeight.sm,
          }
        }
        color={colorVar.cardForeground}
      />
    </Container>
  );
}

const CheckboxAndLabelMemo = React.memo(_CheckboxAndLabel);

export default function CheckboxAndLabel(props: CheckboxAndLabelProps) {
  return <CheckboxAndLabelMemo {...props} />;
}
