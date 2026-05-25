export const icons = {
  size: {
    /** `1rem` — 16px */
    xs: '1rem',
    /** `1.25rem` — 20px */
    sm: '1.25rem',
    /** `1.5rem` — 24px */
    md: '1.5rem',
    /** `2rem` — 32px */
    lg: '2rem',
    /** `2.5rem` — 40px */
    xl: '2.5rem',
  },
} as const;

export type IconsType = typeof icons;
