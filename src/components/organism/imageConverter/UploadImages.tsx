import Spinner from '@/components/atoms/Spinner';
import Texts from '@/components/atoms/Texts';
import FakeInput, { FakeInputHandle } from '@/components/molecules/FakeInput';
import SvgFileSelected from '@/components/molecules/SvgFileSelected';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import { IFileSelected } from '@/lib/types/IFiles';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { colorVar } from '@/styles/colorVars';

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

const ProcessingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const WrapperFiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${colorVar.card};
  padding: 1.5625rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid ${colorVar.border};
  align-items: baseline;
`;

interface UploadImagesProps {
  title: string;
  subtitle: string;
  files: IFileSelected[];
  index: number;
  isProcessingFile?: boolean;
  onFileAdd?: (file: File | null) => void;
  onFileRemove?: (index: number) => void;
}

function _UploadImages({ ...props }: UploadImagesProps) {
  const t = useTranslations('ImageConverter');
  const inputFileRef = useRef<FakeInputHandle>(null);

  const handleFileAdd = (file: File | null) => {
    props.onFileAdd?.(file);
    if (file !== null) {
      inputFileRef.current?.reset();
    }
  };

  const handleClearFile = (index: number) => {
    props.onFileRemove?.(index);
  };

  return (
    <Container>
      <TitleSubtitle
        title={`${t('step_step', { index: props.index })} ${props.title}`}
        subtitle={props.subtitle}
        gap="0.5rem"
      />
      <FileContainer>
        {props.isProcessingFile && (
          <ProcessingRow>
            <Spinner size="1.25rem" thickness="2px" />
            <Texts
              text={t('file_processing')}
              color={colorVar.foreground}
            />
          </ProcessingRow>
        )}
        <FakeInput
          ref={inputFileRef}
          placeholder={t('file_section_placeholder')}
          helperText={t('file_section_span_info_extension')}
          typesAccepted=".png, .jpg, .gif, .bmp, .webp, .heic, .heif, image/heic, image/heif"
          onFileSelect={handleFileAdd}
          variant="solid"
          minWidth="42rem"
          padding="3.125rem"
          spanButtonText={t('file_section_span_button_images')}
        />
      </FileContainer>
      {props.files.length > 0 && (
        <WrapperFiles>
          <Texts
            text={t('title_files_selected', { count: props.files.length })}
            color={colorVar.foreground}
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
        </WrapperFiles>
      )}
    </Container>
  );
}

const UploadImagesMemo = React.memo(_UploadImages);

export default function UploadImages(props: UploadImagesProps) {
  return <UploadImagesMemo {...props} />;
}
