import { ImageFormats } from '@/lib/enums/imgFormats';

export interface IImageFormat {
  width: number;
  height: number;
  extension: ImageFormats;
  quality: number;
}
