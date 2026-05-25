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
  inputBackground: string;
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

export const darkTheme: MainColors = {
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
  inputBackground: 'oklch(0.2748 0.0684 287.03)',
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

export const lightTheme: MainColors = {
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
  inputBackground: 'oklch(0.9842 0.0034 247.86)',
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

export type ThemeColors = {
  darkTheme: MainColors;
  lightTheme: MainColors;
};
