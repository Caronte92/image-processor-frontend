import { lightTheme, darkTheme } from './colors';

export type ILinkVariant = 'ghost' | 'primary';

export interface ILinkState {
  color: string;
  underline: string;
}

export interface ILinkVariantConfig {
  neutral: ILinkState;
  hover: ILinkState;
  active: ILinkState;
  disabled: ILinkState;
}

export const getLinkStyles = (
  mode: 'light' | 'dark'
): Record<ILinkVariant, ILinkVariantConfig> => {
  const p = mode === 'light' ? lightTheme : darkTheme;

  return {
    primary: {
      neutral: {
        color: p.primary,
        underline: p.primary,
      },
      hover: {
        color: p.accent,
        underline: p.accent,
      },
      active: {
        color: p.accentForeground,
        underline: p.accent,
      },
      disabled: {
        color: p.mutedForeground,
        underline: 'transparent',
      },
    },
    ghost: {
      neutral: {
        color: p.foreground,
        underline: 'transparent',
      },
      hover: {
        color: p.primary,
        underline: p.primary,
      },
      active: {
        color: p.primary,
        underline: p.primary,
      },
      disabled: {
        color: p.mutedForeground,
        underline: 'transparent',
      },
    },
  };
};

export type LinkStylesType = ReturnType<typeof getLinkStyles>;
