'use client';

import FakeInput, { FakeInputHandle } from '@/components/molecules/FakeInput';
import Wrapper from '@/components/atoms/Wrapper';
import SvgFileSelected from '@/components/molecules/SvgFileSelected';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import { IFileSelected } from '@/lib/types/IFiles';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import styled from 'styled-components';

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface ImageSectionProps {
  files: IFileSelected[];
  onFileSelect?: (files: File[]) => void;
  onChangeCallback: React.ChangeEventHandler<HTMLInputElement>;
}

function _ImageSection(props: ImageSectionProps) {
  const t = useTranslations('ImageConverter');
  const inputFileRef = useRef<FakeInputHandle>(null);
  const filesRef = useRef<File[]>([]);

  const handleClearFile = (index: number) => {
    filesRef.current.splice(index, 1);
    props.onFileSelect?.(filesRef.current);
    if (filesRef.current.length === 0) {
      inputFileRef.current?.reset();
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      filesRef.current.push(file);
      props.onFileSelect?.(filesRef.current);
    }
  };

  return (
    <Wrapper>
      <TitleSubtitle
        title={t('file_section_title')}
        subtitle={t('file_section_subtitle')}
      />
      <FileContainer>
        <FakeInput
          ref={inputFileRef}
          placeholder={t('file_section_placeholder')}
          helperText={t('file_section_span_info_extension')}
          typesAccepted=".png, .jpg, .gif, .bmp, .webp"
          onFileSelect={handleFileSelect}
          variant="solid"
          minWidth="42rem"
          padding="3.125rem"
          spanButtonText={t('file_section_span_button_images')}
        />
        {props.files.map((file, index) => (
          <SvgFileSelected
            key={`${file.name}-${index}`}
            file={{
              name: file.name,
              size: file.size,
            }}
            onClickCallback={() => handleClearFile(index)}
          />
        ))}
      </FileContainer>
    </Wrapper>
  );
}

const ImageSectionMemo = React.memo(_ImageSection);

export default function ImageSection(props: ImageSectionProps) {
  return <ImageSectionMemo {...props} />;
}
