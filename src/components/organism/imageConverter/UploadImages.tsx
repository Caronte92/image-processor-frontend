import FakeInput, { FakeInputHandle } from '@/components/molecules/FakeInput';
import SvgFileSelected from '@/components/molecules/SvgFileSelected';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import { IFileSelected } from '@/lib/types/IFiles';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  text-align: center;
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

interface UploadImagesProps {
  title: string;
  subtitle: string;
  file: IFileSelected | null;
  index: number;
  onFileSelect?: React.Dispatch<React.SetStateAction<File | null>>;
  onChangeCallback: React.ChangeEventHandler<HTMLInputElement>;
}

function _UploadImages({ ...props }: UploadImagesProps) {
  const t = useTranslations('ImageConverter');
  const inputFileRef = useRef<FakeInputHandle>(null);

  const handleClearFile = () => {
    inputFileRef.current?.reset();
    props.onFileSelect?.(null);
  };

  return (
    <Container>
      <TitleSubtitle
        title={`${t('step_step', { index: props.index })} ${props.title}`}
        subtitle={props.subtitle}
        gap="0.5rem"
      />
      <FileContainer>
        <FakeInput
          ref={inputFileRef}
          placeholder={t('file_section_placeholder')}
          helperText={t('file_section_span_info_extension')}
          typesAccepted=".png, .jpg, .gif, .bmp, .webp"
          onFileSelect={props.onFileSelect}
          variant="solid"
          minWidth="42rem"
          padding="3.125rem"
          spanButtonText={t('file_section_span_button_images')}
        />
        {props.file && (
          <SvgFileSelected
            file={{
              name: props.file.name,
              size: props.file.size,
            }}
            onClickCallback={handleClearFile}
          />
        )}
      </FileContainer>
    </Container>
  );
}

const UploadImagesMemo = React.memo(_UploadImages);

export default function UploadImages(props: UploadImagesProps) {
  return <UploadImagesMemo {...props} />;
}
