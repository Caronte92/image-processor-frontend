function isHeic(file: File): boolean {
  return (
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    /\.hei[cf]$/i.test(file.name)
  );
}

export async function normalizeFile(file: File): Promise<File> {
  if (!isHeic(file)) return file;

  try {
    const { heicTo } = await import('heic-to');
    const blob = await heicTo({
      blob: file,
      type: 'image/jpeg',
      quality: 0.92,
    });
    const baseName = file.name.replace(/\.hei[cf]$/i, '');
    return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
  } catch (e) {
    console.error('[normalizeFile] heic-to failed, using original file:', e);
    return file;
  }
}

export interface ConvertedImage {
  file: File;
  originalFile: File;
  url: string;
}

export interface ConvertedImages {
  files: ConvertedImage[];
}

function computeTargetDimensions(
  imgWidth: number,
  imgHeight: number,
  width: number,
  height: number,
  maintainAspect: boolean
): { width: number; height: number } {
  let newWidth = width || imgWidth;
  let newHeight = height || imgHeight;

  if (maintainAspect) {
    const aspectRatio = imgWidth / imgHeight;
    if (width / height > aspectRatio) {
      newWidth = height * aspectRatio;
    } else {
      newHeight = width / aspectRatio;
    }
  }

  return { width: newWidth, height: newHeight };
}

async function convertSingleImage(
  file: File | Blob,
  width: number,
  height: number,
  maintainAspect: boolean,
  outputFormat: string,
  quality: number[]
): Promise<ConvertedImage | null> {
  if (!file) return null;

  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

    const { width: newWidth, height: newHeight } = computeTargetDimensions(
      img.width,
      img.height,
      width,
      height,
      maintainAspect
    );

    canvas.width = newWidth;
    canvas.height = newHeight;

    if (ctx) {
      const opaqueFormats = ['jpg', 'jpeg', 'bmp'];
      if (opaqueFormats.includes(outputFormat.toLowerCase())) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, newWidth, newHeight);
      }

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const blob = await new Promise<Blob | null>(resolve => {
        const qualityValue =
          outputFormat === 'png' ? undefined : quality[0] / 100;
        canvas.toBlob(resolve, `image/${outputFormat}`, qualityValue);
      });

      if (blob) {
        const fileName = file instanceof File ? file.name : 'converted-image';
        const baseName = fileName.split('.')[0];

        const convertedFile = new File([blob], `${baseName}.${outputFormat}`, {
          type: `image/${outputFormat}`,
        });

        URL.revokeObjectURL(img.src);

        return {
          file: convertedFile,
          originalFile: file as File,
          url: URL.createObjectURL(blob),
        };
      }
    }

    URL.revokeObjectURL(img.src);
  } catch (error) {
    console.error('Error converting image:', error);
  }

  return null;
}

export async function estimateConvertedSize(
  file: File | Blob,
  width: number,
  height: number,
  maintainAspect: boolean,
  outputFormat: string,
  quality: number[]
): Promise<number | null> {
  if (!file) return null;

  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const url = URL.createObjectURL(file);

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    const { width: newWidth, height: newHeight } = computeTargetDimensions(
      img.width,
      img.height,
      width,
      height,
      maintainAspect
    );

    canvas.width = newWidth;
    canvas.height = newHeight;

    if (!ctx) {
      URL.revokeObjectURL(url);
      return null;
    }

    const opaqueFormats = ['jpg', 'jpeg', 'bmp'];
    if (opaqueFormats.includes(outputFormat.toLowerCase())) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, newWidth, newHeight);
    }

    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    URL.revokeObjectURL(url);

    const blob = await new Promise<Blob | null>(resolve => {
      const qualityValue =
        outputFormat === 'png' ? undefined : quality[0] / 100;
      canvas.toBlob(resolve, `image/${outputFormat}`, qualityValue);
    });

    return blob?.size ?? null;
  } catch (error) {
    console.error('Error estimating converted size:', error);
    return null;
  }
}

export async function convertImages(
  files: File | File[],
  width: number,
  height: number,
  maintainAspect: boolean,
  outputFormat: string,
  quality: number[]
): Promise<ConvertedImage | ConvertedImages | null> {
  // Si es un archivo único, mantener compatibilidad con comportamiento anterior
  if (files instanceof File) {
    return convertSingleImage(
      files,
      width,
      height,
      maintainAspect,
      outputFormat,
      quality
    );
  }

  // Si es un array de archivos
  if (Array.isArray(files) && files.length > 0) {
    const convertedResults: ConvertedImage[] = [];

    for (const file of files) {
      const result = await convertSingleImage(
        file,
        width,
        height,
        maintainAspect,
        outputFormat,
        quality
      );
      if (result) {
        convertedResults.push(result);
      }
    }

    return convertedResults.length > 0 ? { files: convertedResults } : null;
  }

  return null;
}
