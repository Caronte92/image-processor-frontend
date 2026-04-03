import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const SpinnerRing = styled.span<{
  $size: string;
  $thickness: string;
  $color: string;
}>`
  display: inline-block;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border: ${({ $thickness }) => $thickness} solid transparent;
  border-top-color: ${({ $color }) => $color};
  border-right-color: ${({ $color }) => $color};
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
  flex-shrink: 0;
`;

interface SpinnerProps {
  size?: string;
  thickness?: string;
  color?: string;
}

function _Spinner({ size = '3rem', thickness = '3px', color }: SpinnerProps) {
  return (
    <SpinnerRing
      $size={size}
      $thickness={thickness}
      $color={color ?? 'currentColor'}
    />
  );
}

const SpinnerMemo = React.memo(_Spinner);

export default function Spinner(props: SpinnerProps) {
  return <SpinnerMemo {...props} />;
}
