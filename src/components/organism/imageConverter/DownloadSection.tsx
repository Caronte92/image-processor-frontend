'use client';

import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import Texts from '@/components/atoms/Texts';
import Wrapper from '@/components/atoms/Wrapper';
import IconDownload from '@/components/atoms/icons/IconDownload';
import IconAndText from '@/components/molecules/IconAndText';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import { formatFileSize } from '@/lib/services/utils/svg';
import { ConvertedImage, ConvertedImages } from '@/lib/services/utils/images';
import { useTranslations } from 'next-intl';
import React from 'react';
import styled from 'styled-components';
import { colorVar } from '@/styles/colorVars';
import { fonts } from '@/styles/fonts';
import { icons } from '@/styles/icons';
import { buttonSizes, buttonStyles } from '@/styles/buttons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const FilesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;

  & + & {
    border-top: 0.0625rem solid ${colorVar.border};
  }
`;

const Divider = styled.div`
  height: 0.0625rem;
  background-color: ${colorVar.border};
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

interface DownloadSectionProps {
  file: ConvertedImage | ConvertedImages | null;
  isConverting: boolean;
  totalFiles: number;
  onConvertMore: () => void;
  onReset: () => void;
}

function _DownloadSection({ ...props }: DownloadSectionProps) {
  const t = useTranslations('ImageConverter');

  if (props.isConverting || !props.file) {
    return (
      <Container>
        <Wrapper>
          <LoadingWrapper>
            <Spinner size="3rem" thickness="3px" color={colorVar.primary} />
            <TitleSubtitle
              title={t('loading_title')}
              subtitle={t('loading_subtitle', { count: props.totalFiles })}
              gap="0.25rem"
            />
            <Texts
              text={t('loading_hint')}
              size={{
                fontSize: fonts.size.sm,
                lineHeight: fonts.lineHeight.sm,
              }}
              color={colorVar.mutedForeground}
            />
          </LoadingWrapper>
        </Wrapper>
      </Container>
    );
  }

  const isMultiple = (props.file as ConvertedImages).files !== undefined;
  const files = isMultiple
    ? (props.file as ConvertedImages).files
    : [props.file as ConvertedImage];

  const downloadFile = (file: ConvertedImage) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = async () => {
    for (let i = 0; i < files.length; i++) {
      downloadFile(files[i]);
      if (i < files.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
  };

  return (
    <Container>
      <TitleSubtitle
        title={t('download_section_completed_title')}
        subtitle={t('download_section_completed_subtitle')}
        gap="0.5rem"
      />
      <Wrapper>
        <Texts
          text={t('download_section_converted_images', { count: files.length })}
          size={{
            fontSize: fonts.size.base,
            lineHeight: fonts.lineHeight.base,
          }}
          fontWeight={fonts.weight.semibold}
          color={colorVar.cardForeground}
        />
        <FilesList>
          {files.map((file, index) => {
            const format = file.file.name.split('.').pop()?.toUpperCase() ?? '';
            const subtitle = `${format} · ${formatFileSize(file.file.size)}`;
            return (
              <FileRow key={`${file.file.name}-${index}`}>
                <TitleSubtitle
                  title={file.originalFile.name}
                  subtitle={subtitle}
                  truncate
                />
                <Button
                  size={buttonSizes.md}
                  color={buttonStyles.ghost}
                  onClickCallback={() => downloadFile(file)}
                >
                  <IconAndText
                    icon={
                      <IconDownload
                        size={icons.size.sm}
                        stroke={colorVar.cardForeground}
                        disableFill
                      />
                    }
                    text={t('download_section_title')}
                    size={{
                      fontSize: fonts.size.sm,
                      lineHeight: fonts.lineHeight.sm,
                    }}
                    color={colorVar.cardForeground}
                  />
                </Button>
              </FileRow>
            );
          })}
        </FilesList>
        <Divider />
        <ButtonsWrapper>
          <Button
            size={buttonSizes.md}
            color={buttonStyles.primary}
            width="100%"
            onClickCallback={downloadAll}
          >
            <IconAndText
              icon={
                <IconDownload
                  size={icons.size.sm}
                  stroke={colorVar.primaryForeground}
                  disableFill
                />
              }
              text={t('download_section_download_all')}
              size={{
                fontSize: fonts.size.sm,
                lineHeight: fonts.lineHeight.sm,
              }}
              color={colorVar.primaryForeground}
            />
          </Button>
          <Button
            size={buttonSizes.md}
            color={buttonStyles.ghost}
            width="100%"
            onClickCallback={props.onConvertMore}
          >
            <Texts
              text={t('download_section_convert_more')}
              size={{
                fontSize: fonts.size.sm,
                lineHeight: fonts.lineHeight.sm,
              }}
              color={colorVar.foreground}
            />
          </Button>
          <Button
            size={buttonSizes.md}
            color={buttonStyles.ghost}
            width="100%"
            onClickCallback={props.onReset}
          >
            <Texts
              text={t('download_section_start_over')}
              size={{
                fontSize: fonts.size.sm,
                lineHeight: fonts.lineHeight.sm,
              }}
              color={colorVar.mutedForeground}
            />
          </Button>
        </ButtonsWrapper>
      </Wrapper>
    </Container>
  );
}

const DownloadSectionMemo = React.memo(_DownloadSection);

export default function DownloadSection(props: DownloadSectionProps) {
  return <DownloadSectionMemo {...props} />;
}
