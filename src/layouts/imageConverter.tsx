'use client';

import { ImageFormats } from '@/lib/enums/imgFormats';
import {
  ConvertedImage,
  ConvertedImages,
  convertImages,
} from '@/lib/services/utils/images';
import { IFileSelected } from '@/lib/types/IFiles';
import Stepper from '@/components/molecules/Stepper';
import BaseLayout from '@/layouts/base';
import UploadImages from '@/components/organism/imageConverter/UploadImages';
import ConfigurationsSection from '@/components/organism/imageConverter/ConfigurationsSection';
import DownloadSection from '@/components/organism/imageConverter/DownloadSection';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 3rem 1.5rem;
  margin: 0 auto;
  width: 100%;
  max-width: 72rem;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function _ImageConverter() {
  const t = useTranslations('ImageConverter');

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<
    ConvertedImage | ConvertedImages | null
  >(null);

  const [format, setFormat] = useState<ImageFormats>(ImageFormats.WEBP);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [quality, setQuality] = useState<number>(100);

  const fileSelected: IFileSelected | null = useMemo(() => {
    if (!selectedFile) return null;
    return {
      name: selectedFile.name,
      size: selectedFile.size,
    };
  }, [selectedFile]);

  const handleFileSelect = (
    file: File | null | ((prev: File | null) => File | null)
  ) => {
    const newFile = typeof file === 'function' ? file(selectedFile) : file;
    setSelectedFile(newFile);
    if (newFile) {
      setStep(2);
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = URL.createObjectURL(newFile);
    } else {
      setStep(1);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    const result = await convertImages(
      selectedFile,
      width,
      height,
      true,
      format,
      [quality]
    );

    if (result) {
      setConvertedImage(result);
      setStep(3);
    }
  };

  const steps = [
    { isActive: step === 1, title: t('step_1_upload_image') },
    { isActive: step === 2, title: t('step_2_configuration') },
    { isActive: step === 3, title: t('step_3_result') },
  ];

  return (
    <Wrapper>
      <Stepper steps={steps} />

      {step === 1 && (
        <UploadImages
          title={t('step_1_upload_image')}
          index={1}
          subtitle={t('step_1_select_images')}
          file={fileSelected}
          onFileSelect={handleFileSelect}
          onChangeCallback={() => {}}
        />
      )}

      {step === 2 && selectedFile && (
        <ConfigurationsSection
          formats={Object.values(ImageFormats)}
          currentFormat={format}
          isGenerateComponentAvailable={false}
          onclickFormatCallback={setFormat}
          onClickCallback={handleConvert}
          onChangeWidthCallback={e => setWidth(parseInt(e.target.value) || 0)}
          onChangeHeightCallback={e => setHeight(parseInt(e.target.value) || 0)}
          onChangeQualityCallback={e =>
            setQuality(parseInt(e.target.value) || 100)
          }
        />
      )}

      {step === 3 && convertedImage && (
        <DownloadSection file={convertedImage} />
      )}
    </Wrapper>
  );
}

const ImageConverterMemo = React.memo(_ImageConverter);

export default function ImageConverter() {
  return (
    <BaseLayout>
      <ImageConverterMemo />
    </BaseLayout>
  );
}
