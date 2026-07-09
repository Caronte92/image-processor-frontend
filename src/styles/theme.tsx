// theme.ts
import { lightTheme, darkTheme } from './colors';
import type { MainColors, ThemeColors } from './colors';
import { fonts } from './fonts';
import type { FontsType } from './fonts';
import { icons } from './icons';
import type { IconsType } from './icons';
import { buttonStyles, buttonSizes } from './buttons';
import type { ButtonStylesType, ButtonSizesType } from './buttons';
import { linkStyles } from './links';
import type { LinkStylesType } from './links';
import { breakpoints } from './breakpoints';
import type { BreakpointsType } from './breakpoints';
export type { MainColors, ThemeColors };

// =======================
// 🧠 THEME INTERFACE
// =======================

export interface IActiveTheme {
  mode: 'light' | 'dark';
  colors: MainColors;
  fonts: FontsType;
  breakpoints: BreakpointsType;
  buttonSizes: ButtonSizesType;
  buttonColors: ButtonStylesType;
  linkColors: LinkStylesType;
  icons: IconsType;
  background: string;
}

// =======================
// 🎯 UTILITY FUNCTIONS
// =======================

export const createDynamicTheme = (mode: 'light' | 'dark'): IActiveTheme => {
  const currentColors = mode === 'light' ? lightTheme : darkTheme;
  return {
    mode,
    colors: currentColors,
    background: currentColors.background,
    fonts,
    breakpoints,
    buttonSizes,
    buttonColors: buttonStyles,
    linkColors: linkStyles,
    icons,
  };
};

export const theme = createDynamicTheme('light');

export const getThemeColors = (mode: 'light' | 'dark'): MainColors =>
  mode === 'light' ? lightTheme : darkTheme;
