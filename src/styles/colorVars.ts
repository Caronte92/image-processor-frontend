import { colors, MainColors } from './colors';

const toKebabCase = (key: string) =>
  key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

export const cssVarName = (key: keyof MainColors) => `--color-${toKebabCase(key)}`;

export const colorVar: { readonly [K in keyof MainColors]: string } =
  Object.fromEntries(
    (Object.keys(colors.light) as (keyof MainColors)[]).map(key => [
      key,
      `var(${cssVarName(key)})`,
    ])
  ) as { [K in keyof MainColors]: string };
