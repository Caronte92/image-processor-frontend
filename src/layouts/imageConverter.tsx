'use client';

import { ImageFormats } from '@/lib/enums/imgFormats';
import {
  ConvertedImage,
  ConvertedImages,
  convertImages,
  normalizeFile,
} from '@/lib/services/utils/images';
import { IFileSelected } from '@/lib/types/IFiles';
import BaseLayout from '@/layouts/base';
import UploadImages from '@/components/organism/imageConverter/UploadImages';
import ConfigurationsSection from '@/components/organism/imageConverter/ConfigurationsSection';
import DownloadSection from '@/components/organism/imageConverter/DownloadSection';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState } from 'react';
import { Page } from '@/styles/common.styles';
import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 70%;
  height: stretch;

  @media (max-width: ${breakpoints.md}) {
    width: 100%;
  }
`;

const ConfigurationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 30%;
  height: stretch;

  @media (max-width: ${breakpoints.md}) {
    width: 100%;
  }
`;

function _ImageConverter() {
  const t = useTranslations('ImageConverter');

  const [converted, setConverted] = useState(false);
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
  const [quality, setQuality] = useState<number>(90);
  const [isConverting, setIsConverting] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  const filesSelected: IFileSelected[] = useMemo(() => {
    return selectedFiles.map(file => ({
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
    }));
  }, [selectedFiles]);

  useEffect(() => {
    return () => {
      filesSelected.forEach(f => f.url && URL.revokeObjectURL(f.url));
    };
  }, [filesSelected]);

  const handleFileAdd = async (file: File | null) => {
    if (!file) return;
    setIsProcessingFile(true);
    const normalized = await normalizeFile(file);
    setIsProcessingFile(false);

    let isFirst = false;
    setSelectedFiles(prev => {
      isFirst = prev.length === 0;
      return [...prev, normalized];
    });

    if (isFirst) {
      const url = URL.createObjectURL(normalized);
      const img = new window.Image();
      img.onload = () => {
        setOriginalDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
        setInputWidth(img.naturalWidth);
        setInputHeight(img.naturalHeight);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) return;

    setIsConverting(true);
    setConverted(true);

    const finalWidth = keepAspectRatio
      ? 0
      : inputWidth || originalDimensions.width;
    const finalHeight = keepAspectRatio
      ? 0
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
    setConverted(false);
    setSelectedFiles([]);
    setConvertedImage(null);
    setOriginalDimensions({ width: 0, height: 0 });
    setInputWidth(0);
    setInputHeight(0);
    setIsConverting(false);
  };

  const handleReset = () => {
    handleConvertMore();
    setKeepAspectRatio(true);
    setFormat(ImageFormats.WEBP);
    setQuality(90);
  };

  return (
    <Page $orientation="row">
      <ImagesWrapper>
        {!converted ? (
          <UploadImages
            title={t('step_1_upload_image')}
            index={1}
            subtitle={t('step_1_select_images')}
            files={filesSelected}
            onFileAdd={handleFileAdd}
            onFileRemove={handleFileRemove}
            isProcessingFile={isProcessingFile}
          />
        ) : (
          <DownloadSection
            file={convertedImage}
            isConverting={isConverting}
            totalFiles={selectedFiles.length}
            onConvertMore={handleConvertMore}
            onReset={handleReset}
          />
        )}
      </ImagesWrapper>
      <ConfigurationsWrapper>
        <ConfigurationsSection
          title={t('step_2_configuration')}
          index={2}
          subtitle={t('step_2_configuration_options')}
          formats={Object.values(ImageFormats)}
          currentFormat={format}
          isGenerateComponentAvailable={false}
          onclickFormatCallback={setFormat}
          onClickCallback={handleConvert}
          onGoBackCallback={() => setConverted(false)}
          onChangeWidthCallback={e =>
            setInputWidth(parseInt(e.target.value) || 0)
          }
          onChangeHeightCallback={e =>
            setInputHeight(parseInt(e.target.value) || 0)
          }
          onChangeQualityCallback={e =>
            setQuality(parseInt(e.target.value) || 90)
          }
          keepAspectRatio={keepAspectRatio}
          onKeepAspectRatioCallback={setKeepAspectRatio}
          totalFiles={filesSelected.length}
        />
      </ConfigurationsWrapper>
    </Page>
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
