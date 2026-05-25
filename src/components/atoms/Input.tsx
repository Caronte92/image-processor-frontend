import React from 'react';
import styled from 'styled-components';

const InputStyled = styled.input`
  background: ${props => props.theme.colors.input};
  display: flex;
  padding: 0.25rem 0.75rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.cardForeground};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'text')};
`;

interface InputProps {
  placeholder: string;
  onChangeCallback?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

function _Input(props: InputProps) {
  return (
    <InputStyled
      placeholder={props.placeholder}
      onChange={props.onChangeCallback}
      disabled={props.disabled}
    />
  );
}

const InputMemo = React.memo(_Input);

export default function Input(props: InputProps) {
  return <InputMemo {...props} />;
}
