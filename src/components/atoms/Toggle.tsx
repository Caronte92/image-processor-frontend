import React from 'react';
import styled from 'styled-components';
import { colorVar } from '@/styles/colorVars';
import { useThemeToggle } from '@/lib/providers/StyledThemeProvider';

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const Switcher = styled.span<{ $isLight: boolean }>`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${colorVar.primaryForeground};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0.25rem;
  transition: transform 0.3s ease;
  transform: ${({ $isLight }) =>
    $isLight ? 'translateX(2rem)' : 'translateX(0rem)'};
`;

const Span = styled.span`
  width: 4rem;
  height: 2rem;
  background-color: ${colorVar.accent};
  border-radius: 1.5rem;
  padding: 0.25rem;
`;

interface ToggleProps {
  icon?: React.ReactNode;
  onToggle?: () => void;
}

function _Toggle({ icon = null, ...props }: ToggleProps) {
  const { themeMode } = useThemeToggle();
  return (
    <Container onClick={props.onToggle}>
      <Switcher $isLight={themeMode === 'light'}>{icon && icon}</Switcher>
      <Span></Span>
    </Container>
  );
}

const ToggleMemo = React.memo(_Toggle);

export default function Toggle(props: ToggleProps) {
  return <ToggleMemo {...props} />;
}
