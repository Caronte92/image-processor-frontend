'use client';

import Wrapper from '@/components/atoms/Wrapper';
import React from 'react';
import { ConvertedImage, ConvertedImages } from '@/lib/services/utils/images';
import Texts from '@/components/atoms/Texts';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';
import Button from '@/components/atoms/Button';
import IconAndText from '@/components/molecules/IconAndText';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import { formatFileSize } from '@/lib/services/utils/svg';
import IconDownload from '@/components/atoms/icons/IconDownload';
import Image from 'next/image';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 0.0625rem solid ${props => props.theme.colors.ring};
  border-radius: 0.625rem;
`;

const PictureWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 8rem;
  background: ${props => props.theme.colors.muted};
  border-radius: 0.25rem;
`;

const Picture = styled(Image)`
  object-fit: contain;
`;

interface DownloadSectionProps {
  file: ConvertedImage | ConvertedImages;
}

function _DownloadSection({ ...props }: DownloadSectionProps) {
  const t = useTranslations('ImageConverter');
  const theme = useTheme();
  const isMultiple = 'files' in props.file;
  const files = isMultiple ? props.file.files : [props.file as ConvertedImage];

  const downloadFile = (file: ConvertedImage) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllAsZip = async () => {
    // Aquí puedes implementar la descarga como ZIP si es necesario
    // Por ahora, descargamos cada archivo uno a uno
    files.forEach(file => downloadFile(file));
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <Texts
          text={t('download_section_title')}
          size={theme.fonts.base}
          color={theme.colors.cardForeground}
        />
        <Button
          size={theme.buttonSizes.md}
          color={theme.buttonColors.ghost}
          onClickCallback={downloadAllAsZip}
        >
          <IconAndText
            icon={<IconDownload size={theme.icons.xs} />}
            text={
              isMultiple
                ? `${t('download_section_title')} (${files.length})`
                : t('download_section_title')
            }
            size={theme.fonts.sm}
            color={theme.colors.cardForeground}
          />
        </Button>
      </HeaderWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {files.map((file, index) => (
          <div key={`${file.file.name}-${index}`}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.5rem',
              }}
            >
              <TitleSubtitle
                title={file.file.name}
                subtitle={formatFileSize(file.file.size)}
                truncate={true}
              />
              <Button
                size={theme.buttonSizes.sm}
                color={theme.buttonColors.ghost}
                onClickCallback={() => downloadFile(file)}
              >
                <IconDownload
                  size={theme.icons.xs}
                  stroke={theme.colors.cardForeground}
                />
              </Button>
            </div>
            <ImageWrapper>
              <PictureWrapper>
                <Picture src={file.url} alt="Converted image" fill />
              </PictureWrapper>
            </ImageWrapper>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

const DownloadSectionMemo = React.memo(_DownloadSection);

export default function DownloadSection(props: DownloadSectionProps) {
  return <DownloadSectionMemo {...props} />;
}
