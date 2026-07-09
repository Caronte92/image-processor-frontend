import { colorVar } from './colorVars';
import { fonts } from './fonts';

export type IButtonVariant = 'ghost' | 'primary';
export type IButtonSize = 'sm' | 'md' | 'lg';

export interface IButtonState {
  background: string;
  color: string;
  border: string;
}

export interface IButtonHoverState extends IButtonState {
  transform?: string;
  boxShadow?: string;
}

export interface IButtonVariantConfig {
  borderWidth?: string;
  neutral: IButtonState;
  hover: IButtonHoverState;
  focus: IButtonState;
  active: IButtonState;
  disabled: IButtonState;
}

export interface IButtonSizeConfig {
  padding: string;
  fontSize: string;
  gap: string;
}

export const buttonSizes: Record<IButtonSize, IButtonSizeConfig> = {
  /** 8/16px */
  sm: {
    padding: '0.5rem 0.75rem',
    fontSize: fonts.size.sm,
    gap: '0.5rem',
  },
  /** 12/24px — default */
  md: {
    padding: '0.5rem 0.75rem',
    fontSize: fonts.size.base,
    gap: '0.5rem',
  },
  /** 16/32px */
  lg: {
    padding: '0.75rem 1.25rem',
    fontSize: fonts.size.lg,
    gap: '0.5rem',
  },
};

export type ButtonSizesType = typeof buttonSizes;

export const buttonStyles: Record<IButtonVariant, IButtonVariantConfig> = {
  primary: {
    neutral: {
      background: colorVar.primary,
      color: colorVar.primaryForeground,
      border: colorVar.primary,
    },
    hover: {
      background: colorVar.secondary,
      color: colorVar.secondaryForeground,
      border: colorVar.primary,
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 16px oklch(0 0 0 / 0.15)',
    },
    focus: {
      background: colorVar.primary,
      color: colorVar.primaryForeground,
      border: colorVar.ring,
    },
    active: {
      background: colorVar.accent,
      color: colorVar.accentForeground,
      border: colorVar.primary,
    },
    disabled: {
      background: colorVar.muted,
      color: colorVar.mutedForeground,
      border: colorVar.border,
    },
  },
  ghost: {
    neutral: {
      background: colorVar.inputBackground,
      color: colorVar.foreground,
      border: 'transparent',
    },
    hover: {
      background: colorVar.accent,
      color: colorVar.foreground,
      border: colorVar.primary,
    },
    focus: {
      background: colorVar.inputBackground,
      color: colorVar.foreground,
      border: colorVar.ring,
    },
    active: {
      background: colorVar.primary,
      color: colorVar.foreground,
      border: colorVar.ring,
    },
    disabled: {
      background: colorVar.muted,
      color: colorVar.mutedForeground,
      border: colorVar.border,
    },
  },
};

export type ButtonStylesType = typeof buttonStyles;
