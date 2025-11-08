// theme.ts

// =======================
// 🎨 COLOR PALETTES
// =======================

export type MainColors = {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
    sidebar: string;
    sidebarForeground: string;
    sidebarPrimary: string;
    sidebarPrimaryForeground: string;
    sidebarAccent: string;
    sidebarAccentForeground: string;
    sidebarBorder: string;
    sidebarRing: string;
};

const darkTheme: MainColors = {
    background: 'oklch(0.164 0.041 292.82)',
    foreground: 'oklch(0.9683 0.0069 247.9)',
    card: 'oklch(0.2145 0.059 290.99)',
    cardForeground: 'oklch(0.9683 0.0069 247.9)',
    popover: 'oklch(0.2145 0.059 290.99)',
    popoverForeground: 'oklch(0.9683 0.0069 247.9)',
    primary: 'oklch(0.5854 0.2041 277.12)',
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.3588 0.1354 278.7)',
    secondaryForeground: 'oklch(0.9299 0.0334 272.79)',
    muted: 'oklch(0.2748 0.0684 287.03)',
    mutedForeground: 'oklch(0.7107 0.0351 256.79)',
    accent: 'oklch(0.4568 0.2146 277.02)',
    accentForeground: 'oklch(0.9299 0.0334 272.79)',
    destructive: 'oklch(0.6368 0.2078 25.33)',
    destructiveForeground: 'oklch(1 0 0)',
    border: 'oklch(0.3588 0.1354 278.7)',
    input: 'oklch(0.2748 0.0684 287.03)',
    ring: 'oklch(0.6056 0.2189 292.72)',
    chart1: 'oklch(0.5854 0.2041 277.12)',
    chart2: 'oklch(0.6056 0.2189 292.72)',
    chart3: 'oklch(0.7148 0.1257 215.22)',
    chart4: 'oklch(0.6959 0.1491 162.48)',
    chart5: 'oklch(0.7686 0.1647 70.08)',
    sidebar: 'oklch(0.2145 0.059 290.99)',
    sidebarForeground: 'oklch(0.9683 0.0069 247.9)',
    sidebarPrimary: 'oklch(0.5854 0.2041 277.12)',
    sidebarPrimaryForeground: 'oklch(1 0 0)',
    sidebarAccent: 'oklch(0.3588 0.1354 278.7)',
    sidebarAccentForeground: 'oklch(0.9299 0.0334 272.79)',
    sidebarBorder: 'oklch(0.3588 0.1354 278.7)',
    sidebarRing: 'oklch(0.6056 0.2189 292.72)',
};

const lightTheme: MainColors = {
    background: 'oklch(0.9885 0.0054 274.97)',
    foreground: 'oklch(0.2434 0.0577 285.68)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.2434 0.0577 285.68)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.2434 0.0577 285.68)',
    primary: 'oklch(0.5106 0.2301 276.97)',
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.9299 0.0334 272.79)',
    secondaryForeground: 'oklch(0.3984 0.1773 277.37)',
    muted: 'oklch(0.9683 0.0069 247.9)',
    mutedForeground: 'oklch(0.5544 0.0407 257.42)',
    accent: 'oklch(0.8943 0.0549 293.28)',
    accentForeground: 'oklch(0.432 0.2106 292.76)',
    destructive: 'oklch(0.6368 0.2078 25.33)',
    destructiveForeground: 'oklch(1 0 0)',
    border: 'oklch(0.9288 0.0126 255.51)',
    input: 'transparent',
    ring: 'oklch(0.6056 0.2189 292.72)',
    chart1: 'oklch(0.5854 0.2041 277.12)',
    chart2: 'oklch(0.6056 0.2189 292.72)',
    chart3: 'oklch(0.7148 0.1257 215.22)',
    chart4: 'oklch(0.6959 0.1491 162.48)',
    chart5: 'oklch(0.7686 0.1647 70.08)',
    sidebar: 'oklch(0.9842 0.0034 247.86)',
    sidebarForeground: 'oklch(0.2434 0.0577 285.68)',
    sidebarPrimary: 'oklch(0.5106 0.2301 276.97)',
    sidebarPrimaryForeground: 'oklch(1 0 0)',
    sidebarAccent: 'oklch(0.9299 0.0334 272.79)',
    sidebarAccentForeground: 'oklch(0.3984 0.1773 277.37)',
    sidebarBorder: 'oklch(0.9288 0.0126 255.51)',
    sidebarRing: 'oklch(0.6056 0.2189 292.72)',
};

// =======================
// 🧩 TYPE DEFINITIONS
// =======================

export type ThemeColors = {
    darkTheme: MainColors;
    lightTheme: MainColors;
};

export type FontWeight = {
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
};

export type Typography = {
    fontSize: string;
    lineHeight: string;
};

export type Fonts = {
    xxs: Typography;
    xs: Typography;
    sm: Typography;
    base: Typography;
    lg: Typography;
    xl: Typography;
    xxl: Typography;
    xxxl: Typography;
    xxxxl: Typography;
};

// BUTTONS
export type ButtonSize = {
    height: string;
    padding: string;
};

export type ButtonSizes = {
    md: ButtonSize;
};

export type ButtonColor = {
    content: string;
    background: string;
    border: string;
};

export type ButtonColorState = {
    default: ButtonColor;
    hover: ButtonColor;
    disabled: ButtonColor;
    selected: ButtonColor;
};

export type ButtonColors = {
    ghost: ButtonColorState;
    primary: ButtonColorState;
};

export const getButtonColors = (mode: 'light' | 'dark', colors: ThemeColors): ButtonColors => {
    const palette = mode === 'light' ? colors.lightTheme : colors.darkTheme;

    return {
        ghost: {
            default: {
                content: palette.foreground,
                background: palette.input,
                border: palette.sidebarBorder,
            },
            hover: {
                content: palette.foreground,
                background: palette.accent,
                border: palette.primary,
            },
            disabled: {
                content: palette.mutedForeground,
                background: palette.muted,
                border: palette.border,
            },
            selected: {
                content: palette.foreground,
                background: palette.primary,
                border: palette.ring,
            },
        },
        primary: {
            default: {
                content: palette.foreground,
                background: palette.primary,
                border: palette.sidebarBorder,
            },
            hover: {
                content: palette.foreground,
                background: palette.secondary,
                border: palette.primary,
            },
            disabled: {
                content: palette.primaryForeground,
                background: palette.primary,
                border: palette.border,
            },
            selected: {
                content: palette.foreground,
                background: palette.primary,
                border: palette.ring,
            },
        }
    };
};

// ICONS
export type IconSize = {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};

// =======================
// 🧠 THEME INTERFACES
// =======================

export interface ITheme {
    // widthPage: string;
    colors: ThemeColors;
    fonts: Fonts;
    weights: FontWeight;
    buttonSizes: ButtonSizes;
    buttonColors: ButtonColors;
    icons: IconSize;
}

export interface IActiveTheme extends Omit<ITheme, 'colors' | 'buttonColors'> {
    // widthPage: string;
    mode: 'light' | 'dark';
    colors: MainColors;
    buttonColors: ButtonColors;
    background: string;
}

// =======================
// ⚙️ THEME INSTANCE
// =======================

export const theme: ITheme = {
    // widthPage: '99rem',
    colors: {
        darkTheme,
        lightTheme,
    },
    fonts: {
        xxs: { fontSize: '0.625rem', lineHeight: '1rem' },
        xs: { fontSize: '0.75rem', lineHeight: '1rem' },
        sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
        base: { fontSize: '1rem', lineHeight: '1.5rem' },
        lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
        xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
        xxl: { fontSize: '1.5rem', lineHeight: '2rem' },
        xxxl: { fontSize: '1.75rem', lineHeight: '2.5rem' },
        xxxxl: { fontSize: '2rem', lineHeight: '3rem' },
    },
    weights: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    buttonSizes: {
        md: {
            height: 'auto',
            padding: '.5rem .75rem',
        },
    },
    buttonColors: getButtonColors('light', { darkTheme, lightTheme }),
    icons: {
        xs: '1em',
        sm: '1.25em',
        md: '1.5em',
        lg: '2em',
        xl: '2.5em',
    },
};

// =======================
// 🎯 UTILITY FUNCTIONS
// =======================

export const createDynamicTheme = (mode: 'light' | 'dark'): IActiveTheme => {
    const currentColors = mode === 'light' ? lightTheme : darkTheme;

    return {
        mode,
        colors: currentColors,
        background: currentColors.background,
        fonts: theme.fonts,
        weights: theme.weights,
        buttonSizes: theme.buttonSizes,
        buttonColors: getButtonColors(mode, theme.colors),
        icons: theme.icons,
    };
};

export const getThemeColors = (mode: 'light' | 'dark'): MainColors => {
    return mode === 'light' ? lightTheme : darkTheme;
};
