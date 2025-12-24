'use client';

import Wrapper from '@/components/atoms/Wrapper';
import React from 'react';
import { ConvertedImage } from '@/lib/services/utils/images';
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

const WrapperTexts = styled.div`
  display: flex;
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
  file: ConvertedImage;
}

function _DownloadSection({ ...props }: DownloadSectionProps) {
  const t = useTranslations('ImageConverter');
  const theme = useTheme();

  const downloadAsTSX = () => {
    const link = document.createElement('a');
    link.href = props.file.url;
    link.download = props.file.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <Texts text={t('download_section_title')} size={theme.fonts.base} color={theme.colors.cardForeground} />
        <Button size={theme.buttonSizes.md} color={theme.buttonColors.ghost} onClickCallback={downloadAsTSX}>
          <IconAndText
            icon={<IconDownload size={theme.icons.xs} />}
            text={t('download_section_title')}
            size={theme.fonts.sm}
            color={theme.colors.cardForeground}
          />
        </Button>
      </HeaderWrapper>
      <ImageWrapper>
        <WrapperTexts>
          <TitleSubtitle title={props.file.file.name} subtitle={formatFileSize(props.file.file.size)} truncate={true} />
        </WrapperTexts>
        <PictureWrapper>
          <Picture src={props.file.url} alt="Converted image" fill />
        </PictureWrapper>
      </ImageWrapper>
    </Wrapper>
  );
}

const DownloadSectionMemo = React.memo(_DownloadSection);

export default function DownloadSection(props: DownloadSectionProps) {
  return <DownloadSectionMemo {...props} />;
}
