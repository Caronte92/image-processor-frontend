'use client';

import { createGlobalStyle } from 'styled-components';
import { colors, MainColors } from './colors';
import { cssVarName } from './colorVars';

const buildColorVarsBlock = (palette: MainColors) =>
  Object.entries(palette)
    .map(([key, value]) => `    ${cssVarName(key as keyof MainColors)}: ${value};`)
    .join('\n');

export const GlobalStyle = createGlobalStyle`
  /* Variables CSS de color, por tema */
  :root[data-theme='light'] {
    color-scheme: light;
${buildColorVarsBlock(colors.light)}
  }

  :root[data-theme='dark'] {
    color-scheme: dark;
${buildColorVarsBlock(colors.dark)}
  }

  /* Reset y box-sizing */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* HTML y Body */
  html, body {
    height: 100%;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
  }

  /* Body específico */
  body {
    color: var(--color-foreground);
    background: var(--color-background);
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Enlaces */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Form elements */
  button, input, textarea, select {
    font: inherit;
  }

  /* Media elements */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
`;