export const breakpoints = {
  /** `480px` — móvil grande */
  xs: '480px',
  /** `640px` — sm */
  sm: '640px',
  /** `768px` — md / tablet */
  md: '768px',
  /** `1024px` — lg / desktop pequeño */
  lg: '1024px',
  /** `1280px` — xl */
  xl: '1280px',
  /** `1536px` — 2xl */
  '2xl': '1536px',
} as const;

export type BreakpointsType = typeof breakpoints;

/** Helper para media queries min-width en styled-components
 * @example `${up('md')} { ... }` → `@media (min-width: 768px) { ... }`
 */
export const up = (bp: keyof BreakpointsType) =>
  `@media (min-width: ${breakpoints[bp]})`;

/** Helper para media queries max-width en styled-components
 * @example `${down('md')} { ... }` → `@media (max-width: 767px) { ... }`
 */
export const down = (bp: keyof BreakpointsType) => {
  const value = parseInt(breakpoints[bp], 10) - 1;
  return `@media (max-width: ${value}px)`;
};
