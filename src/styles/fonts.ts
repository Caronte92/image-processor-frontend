
export const fonts = {
  family: {
    /** Fuente principal del proyecto — Work Sans con fallback al sistema */
    sans: "var(--font-work-sans), 'Work Sans', system-ui, -apple-system, sans-serif",
    /** Fuente monoespaciada — para código */
    mono: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace",
  },
  size: {
    /** `0.625rem` — 10px */
    xxs: '0.625rem',
    /** `0.75rem` — 12px */
    xs: '0.75rem',
    /** `0.875rem` — 14px */
    sm: '0.875rem',
    /** `1rem` — 16px */
    base: '1rem',
    /** `1.125rem` — 18px */
    lg: '1.125rem',
    /** `1.25rem` — 20px */
    xl: '1.25rem',
    /** `1.5rem` — 24px */
    '2xl': '1.5rem',
    /** `1.875rem` — 30px */
    '3xl': '1.875rem',
    /** `2.25rem` — 36px */
    '4xl': '2.25rem',
  },
    lineHeight: {
      /** `1rem` — 16px */
    xxs: '1rem',
    /** `1rem` — 16px */
      xs: '1rem',
    /** `1.25rem` — 20px */
      sm: '1.25rem',
    /** `1.5rem` — 24px */
      base: '1.5rem',
    /** `1.75rem` — 28px */
      lg: '1.75rem',
    /** `1.75rem` — 28px */
      xl: '1.75rem',
    /** `2rem` — 32px */
      '2xl': '2rem',
    /** `2.5rem` — 40px */
      '3xl': '2.5rem',
    /** `3rem` — 48px */
      '4xl': '3rem',
  },
  weight: {
    /** `400` */
    normal: 400,
    /** `500` */
    medium: 500,
    /** `600` */
    semibold: 600,
    /** `700` */
    bold: 700,
    /** `800` */
    extrabold: 800,
  },
  color: {

  },
} as const;

export type FontsType = typeof fonts;
