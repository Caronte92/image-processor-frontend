'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import ImageSection from '../organism/imageConverter/ImageSection';
import ConfigurationsSection from '@/components/organism/imageConverter/ConfigurationsSection';
import { ImageFormats } from '@/lib/enums/imgFormats';
import { convertImages, ConvertedImages } from '@/lib/services/utils/images';
import DownloadSection from '@/components/organism/imageConverter/DownloadSection';
import { IImageFormat } from '@/lib/types/IImageFormat';

const Container = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const WrapperSpace = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 1 0;
  min-width: 0;
`;

function _ImageConverterObsolete() {
  const [, setSvgName] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const formats = [
    ImageFormats.WEBP,
    ImageFormats.JPEG,
    ImageFormats.PNG,
    ImageFormats.GIF,
  ];
  const [formattedImages, setFormattedImages] =
    useState<ConvertedImages | null>(null);
  const [settings, setSettings] = useState<IImageFormat>({
    width: 800,
    height: 600,
    extension: formats[0],
    quality: 100,
  });

  const handleSvgName = (value: string) => {
    setSvgName(value);
  };

  const handleConvertImages = async () => {
    if (selectedFiles.length > 0) {
      const result = await convertImages(
        selectedFiles,
        settings.width,
        settings.height,
        true,
        settings.extension,
        [settings.quality]
      );
      if (result && 'files' in result) {
        setFormattedImages(result);
      }
    }
  };

  return (
    <Container>
      <WrapperSpace>
        <ImageSection
          files={selectedFiles.map(file => ({
            name: file.name,
            size: file.size,
          }))}
          onFileSelect={setSelectedFiles}
          onChangeCallback={e => handleSvgName(e.target.value)}
        />
        <ConfigurationsSection
          formats={formats}
          currentFormat={settings.extension}
          isGenerateComponentAvailable={selectedFiles.length === 0}
          onclickFormatCallback={e =>
            setSettings({ ...settings, extension: e })
          }
          onChangeWidthCallback={e =>
            setSettings({ ...settings, width: parseInt(e.target.value) })
          }
          onChangeHeightCallback={e =>
            setSettings({ ...settings, height: parseInt(e.target.value) })
          }
          onChangeQualityCallback={e =>
            setSettings({ ...settings, quality: parseInt(e.target.value) })
          }
          onClickCallback={handleConvertImages}
        />
      </WrapperSpace>
      <WrapperSpace>
        {formattedImages && <DownloadSection file={formattedImages} />}
      </WrapperSpace>
    </Container>
  );
}

const ImageConverterObsoleteMemo = React.memo(_ImageConverterObsolete);

export default function ImageConverterObsolete() {
  return <ImageConverterObsoleteMemo />;
}
