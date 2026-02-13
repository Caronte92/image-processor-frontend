export interface ConvertedImage {
  file: File;
  originalFile: File;
  url: string;
}

export interface ConvertedImages {
  files: ConvertedImage[];
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

    let newWidth = width;
    let newHeight = height;

    if (maintainAspect) {
      const aspectRatio = img.width / img.height;
      if (width / height > aspectRatio) {
        newWidth = height * aspectRatio;
      } else {
        newHeight = width / aspectRatio;
      }
    }

    canvas.width = newWidth;
    canvas.height = newHeight;

    if (ctx) {
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
