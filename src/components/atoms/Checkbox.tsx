import React from 'react';
import styled from 'styled-components';

const CheckboxStyled = styled.input`
  appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.inputBackground};
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
    background-size: 0.75rem;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

interface CheckboxProps {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function _Checkbox(props: CheckboxProps) {
  return (
    <CheckboxStyled
      type="checkbox"
      checked={props.checked}
      onChange={props.onChange}
    />
  );
}

const CheckboxMemo = React.memo(_Checkbox);

export default function Checkbox(props: CheckboxProps) {
  return <CheckboxMemo {...props} />;
}
