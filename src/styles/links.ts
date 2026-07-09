import { colorVar } from './colorVars';

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

export const linkStyles: Record<ILinkVariant, ILinkVariantConfig> = {
  primary: {
    neutral: {
      color: colorVar.primary,
      underline: colorVar.primary,
    },
    hover: {
      color: colorVar.accent,
      underline: colorVar.accent,
    },
    active: {
      color: colorVar.accentForeground,
      underline: colorVar.accent,
    },
    disabled: {
      color: colorVar.mutedForeground,
      underline: 'transparent',
    },
  },
  ghost: {
    neutral: {
      color: colorVar.foreground,
      underline: 'transparent',
    },
    hover: {
      color: colorVar.primary,
      underline: colorVar.primary,
    },
    active: {
      color: colorVar.primary,
      underline: colorVar.primary,
    },
    disabled: {
      color: colorVar.mutedForeground,
      underline: 'transparent',
    },
  },
};

export type LinkStylesType = typeof linkStyles;
