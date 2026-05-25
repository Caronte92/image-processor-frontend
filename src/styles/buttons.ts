import { lightTheme, darkTheme } from './colors';
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

export const getButtonStyles = (
  mode: 'light' | 'dark'
): Record<IButtonVariant, IButtonVariantConfig> => {
  const p = mode === 'light' ? lightTheme : darkTheme;

  return {
    primary: {
      neutral: {
        background: p.primary,
        color: p.primaryForeground,
        border: p.primary,
      },
      hover: {
        background: p.secondary,
        color: p.secondaryForeground,
        border: p.primary,
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 16px oklch(0 0 0 / 0.15)',
      },
      focus: {
        background: p.primary,
        color: p.primaryForeground,
        border: p.ring,
      },
      active: {
        background: p.accent,
        color: p.accentForeground,
        border: p.primary,
      },
      disabled: {
        background: p.muted,
        color: p.mutedForeground,
        border: p.border,
      },
    },
    ghost: {
      neutral: {
        background: p.inputBackground,
        color: p.foreground,
        border: 'transparent',
      },
      hover: {
        background: p.accent,
        color: p.foreground,
        border: p.primary,
      },
      focus: {
        background: p.inputBackground,
        color: p.foreground,
        border: p.ring,
      },
      active: {
        background: p.primary,
        color: p.foreground,
        border: p.ring,
      },
      disabled: {
        background: p.muted,
        color: p.mutedForeground,
        border: p.border,
      },
    },
  };
};

export type ButtonStylesType = ReturnType<typeof getButtonStyles>;
