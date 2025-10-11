// styled.d.ts
import 'styled-components';
import type { IActiveTheme } from '@/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends IActiveTheme {}
}