'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import ImageSection from '../organism/imageConverter/ImageSection';
import ConfigurationsSection from '@/components/organism/imageConverter/ConfigurationsSection';
import { ImageFormats } from '@/lib/enums/imgFormats';
import { convertImages, ConvertedImage } from '@/lib/services/utils/images';
import DownloadSection from '@/components/organism/imageConverter/DownloadSection';
import { IImageFormat } from '@/lib/types/IImageFormat';

const Container = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const WrapperSpace = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 1 0;
  min-width: 0;
`;

function _ImageConverter() {
  const [, setSvgName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formats = [ImageFormats.WEBP, ImageFormats.JPEG, ImageFormats.PNG, ImageFormats.GIF];
  const [formattedImage, setFormattedImage] = useState<ConvertedImage | null>(null);
  const [settings, setSettings] = useState<IImageFormat>({
    width: 800,
    height: 600,
    extension: formats[0],
    quality: 100,
  });

  const handleSvgName = (value: string) => {
    setSvgName(value);
  };

  return (
    <Container>
      <WrapperSpace>
        <ImageSection
          file={selectedFile ?? null}
          onFileSelect={setSelectedFile}
          onChangeCallback={e => handleSvgName(e.target.value)}
        />
        <ConfigurationsSection
          formats={formats}
          currentFormat={settings.extension}
          isGenerateComponentAvailable={selectedFile === null}
          onclickFormatCallback={e => setSettings({ ...settings, extension: e })}
          onChangeWidthCallback={e => setSettings({ ...settings, width: parseInt(e.target.value) })}
          onChangeHeightCallback={e => setSettings({ ...settings, height: parseInt(e.target.value) })}
          onChangeQualityCallback={e => setSettings({ ...settings, quality: parseInt(e.target.value) })}
          onClickCallback={async () => {
            if (selectedFile) {
              let result = await convertImages(
                selectedFile,
                settings.width,
                settings.height,
                true,
                settings.extension,
                [settings.quality]
              );
              if (result) {
                setFormattedImage(result);
              }
            }
          }}
        />
      </WrapperSpace>
      <WrapperSpace>{formattedImage && <DownloadSection file={formattedImage} />}</WrapperSpace>
    </Container>
  );
}

const ImageConverterMemo = React.memo(_ImageConverter);

export default function ImageConverter() {
  return <ImageConverterMemo />;
}
