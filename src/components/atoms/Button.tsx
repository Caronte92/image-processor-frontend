import { ButtonColorState, ButtonSize } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const getBorder = (
  enabled: boolean,
  enabledBorder: string,
  disabledBorder: string
) => {
  let borderBase = '0.0625em solid';
  if (enabled)
    return enabledBorder !== ''
      ? `${borderBase} ${enabledBorder}`
      : 'transparent';
  return disabledBorder !== ''
    ? `${borderBase} ${disabledBorder}`
    : 'transparent';
};

const Container = styled.button<{
  $color: ButtonColorState;
  $size: ButtonSize;
  $enabled: boolean;
  $selected?: boolean;
  $hideBorder: boolean;
  $width: string;
}>`
  width: ${props => props.$width};
  padding: ${props => props.$size.padding};
  color: ${props =>
    props.$enabled
      ? props.$selected
        ? props.$color.selected
        : props.$color.default.content
      : props.$color.disabled.content};
  background-color: ${props =>
    props.$enabled
      ? props.$selected
        ? props.$color.selected
        : props.$color.default.background
      : props.$color.disabled.background};
  cursor: ${props => (props.$enabled ? 'pointer' : 'not-allowed')};
  border: ${({ $enabled, $color, $hideBorder }) =>
    $hideBorder
      ? 'transparent'
      : getBorder($enabled, $color.default.border, $color.disabled.border)};
  border-radius: 0.25em;
  opacity: ${props => (props.$enabled ? 'unset' : '0.4')};
  gap: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props =>
      props.$enabled
        ? props.$color.hover.content
        : props.$color.disabled.content};
    background-color: ${props =>
      props.$enabled
        ? props.$color.hover.background
        : props.$color.disabled.background};
    border: ${({ $enabled, $color, $hideBorder }) =>
      $hideBorder
        ? 'transparent'
        : getBorder($enabled, $color.default.border, $color.disabled.border)};
  }
`;

interface ButtonProps {
  children: React.ReactNode;
  size: ButtonSize;
  color: ButtonColorState;
  disabled?: boolean;
  selected?: boolean;
  hideBorder?: boolean;
  width?: string;
  onClickCallback: React.MouseEventHandler<HTMLButtonElement>;
}

function _Button({
  children,
  size,
  color,
  disabled,
  selected,
  hideBorder = false,
  width = 'fit-content',
  onClickCallback,
}: ButtonProps) {
  const _handleOnclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClickCallback(event);
  };

  return (
    <Container
      $color={color}
      $size={size}
      $enabled={!disabled}
      $selected={selected}
      $hideBorder={hideBorder}
      $width={width}
      onClick={_handleOnclick}
    >
      {children}
    </Container>
  );
}

const ButtonMemo = React.memo(_Button);

export default function Button(props: ButtonProps) {
  return <ButtonMemo {...props} />;
}
