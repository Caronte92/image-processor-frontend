//Fonts
type FontWeight = {
    regular: string,
    medium: string,
    semibold: string,
    bold: string
}

export type Typography = {
    fontSize: string,
    lineHeight: string
}

type Fonts = {
    xxs: Typography
    xs: Typography,
    sm: Typography,
    base: Typography,
    lg: Typography,
    xl: Typography,
    xxl: Typography,
    xxxl: Typography,
    xxxxl: Typography
}

interface ITheme {
    fonts: Fonts;
    weights: FontWeight;
}

export const theme: ITheme = {
    fonts: {
        xxs: {
            fontSize: '0.625rem',
            lineHeight: '1rem'
        },
        xs: {
            fontSize: '0.75rem',
            lineHeight: '1rem'
        },
        sm: {
            fontSize: '0.875rem',
            lineHeight: '1.25rem'
        },
        base: {
            fontSize: '1rem',
            lineHeight: '1.5rem'
        },
        lg: {
            fontSize: '1.125rem',
            lineHeight: '1.75rem'
        },
        xl: {
            fontSize: '1.25rem',
            lineHeight: '1.75rem'
        },
        xxl: {
            fontSize: '1.5rem',
            lineHeight: '2rem'
        },
        xxxl: {
            fontSize: '1.75rem',
            lineHeight: '2.5rem'
        },
        xxxxl: {
            fontSize: '2rem',
            lineHeight: '3rem'
        }
    },
    weights: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
    },
};