// styled.d.ts
import type { IActiveTheme } from '@/theme';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends IActiveTheme {}
}