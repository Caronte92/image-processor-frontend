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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedImage, setConvertedImage] = useState<
    ConvertedImage | ConvertedImages | null
  >(null);

  const [format, setFormat] = useState<ImageFormats>(ImageFormats.WEBP);
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [inputHeight, setInputHeight] = useState<number>(0);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [quality, setQuality] = useState<number>(100);
  const [isConverting, setIsConverting] = useState(false);

  const filesSelected: IFileSelected[] = useMemo(() => {
    return selectedFiles.map(file => ({
      name: file.name,
      size: file.size,
    }));
  }, [selectedFiles]);

  const handleFileAdd = (file: File | null) => {
    if (file) {
      setSelectedFiles(prev => [...prev, file]);
    }
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (selectedFiles.length === 0) return;
    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(selectedFiles[0]);
    setStep(2);
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) return;

    setIsConverting(true);
    setStep(3);

    const finalWidth = keepAspectRatio
      ? originalDimensions.width
      : inputWidth || originalDimensions.width;
    const finalHeight = keepAspectRatio
      ? originalDimensions.height
      : inputHeight || originalDimensions.height;

    const filesToConvert =
      selectedFiles.length === 1 ? selectedFiles[0] : selectedFiles;

    const result = await convertImages(
      filesToConvert,
      finalWidth,
      finalHeight,
      false,
      format,
      [quality]
    );

    if (result) {
      setConvertedImage(result);
    }
    setIsConverting(false);
  };

  const handleConvertMore = () => {
    setStep(1);
    setSelectedFiles([]);
    setConvertedImage(null);
    setInputWidth(0);
    setInputHeight(0);
    setKeepAspectRatio(true);
    setIsConverting(false);
    setFormat(ImageFormats.WEBP);
    setQuality(100);
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
          files={filesSelected}
          onFileAdd={handleFileAdd}
          onFileRemove={handleFileRemove}
          onContinue={handleContinue}
        />
      )}

      {step === 2 && selectedFiles.length > 0 && (
        <ConfigurationsSection
          title={t('step_2_configuration')}
          index={2}
          subtitle={t('step_2_configuration_options')}
          formats={Object.values(ImageFormats)}
          currentFormat={format}
          isGenerateComponentAvailable={false}
          onclickFormatCallback={setFormat}
          onClickCallback={handleConvert}
          onGoBackCallback={() => setStep(1)}
          onChangeWidthCallback={e =>
            setInputWidth(parseInt(e.target.value) || 0)
          }
          onChangeHeightCallback={e =>
            setInputHeight(parseInt(e.target.value) || 0)
          }
          onChangeQualityCallback={e =>
            setQuality(parseInt(e.target.value) || 100)
          }
          keepAspectRatio={keepAspectRatio}
          onKeepAspectRatioCallback={setKeepAspectRatio}
          totalFiles={filesSelected.length}
        />
      )}

      {step === 3 && (
        <DownloadSection
          file={convertedImage}
          isConverting={isConverting}
          totalFiles={selectedFiles.length}
          onConvertMore={handleConvertMore}
        />
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
