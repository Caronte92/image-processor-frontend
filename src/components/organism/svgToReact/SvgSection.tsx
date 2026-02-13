'use client';

import Wrapper from '@/components/atoms/Wrapper';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import FakeInput, { FakeInputHandle } from '@/components/molecules/FakeInput';
import { useTheme, styled } from 'styled-components';
import Texts from '@/components/atoms/Texts';
import InputLabel from '@/components/molecules/InputLabel';
import Button from '@/components/atoms/Button';
import { IFileSelected } from '@/lib/types/IFiles';
import SvgFileSelected from '@/components/molecules/SvgFileSelected';

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface SvgSectionProps {
  isGenerateComponentAvailable: boolean;
  file: IFileSelected | null;
  onFileSelect?: React.Dispatch<React.SetStateAction<File | null>>;
  onChangeCallback: React.ChangeEventHandler<HTMLInputElement>;
  onClickCallback: React.MouseEventHandler<HTMLButtonElement>;
}

function _SvgSection({
  isGenerateComponentAvailable,
  ...props
}: SvgSectionProps) {
  const t = useTranslations('SvgToReact');
  const theme = useTheme();
  const inputFileRef = useRef<FakeInputHandle>(null);

  const handleClearFile = () => {
    inputFileRef.current?.reset();
    props.onFileSelect?.(null);
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
          typesAccepted=".svg"
          onFileSelect={props.onFileSelect}
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
        <InputLabel
          label={t('file_section_span_name_input')}
          placeholder={t('file_section_span_name_placeholder_input')}
          onChangeCallback={props.onChangeCallback}
        />
        <Button
          size={theme.buttonSizes.md}
          color={theme.buttonColors.primary}
          disabled={isGenerateComponentAvailable}
          onClickCallback={props.onClickCallback}
        >
          <Texts
            text={t('file_section_btn_generate')}
            size={theme.fonts.sm}
            color={theme.colors.foreground}
          />
        </Button>
      </FileContainer>
    </Wrapper>
  );
}

const SvgSectionMemo = React.memo(_SvgSection);

export default function SvgSection(props: SvgSectionProps) {
  return <SvgSectionMemo {...props} />;
}
