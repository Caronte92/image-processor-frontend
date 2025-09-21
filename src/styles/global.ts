'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Variables CSS */
  :root {
    --background: #ffffff;
    --foreground: #171717;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: #0a0a0a;
      --foreground: #ededed;
    }
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
    color: var(--foreground);
    background: var(--background);
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

  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    
    body {
      background: var(--background);
      color: var(--foreground);
    }
  }
`;