'use client';

import IconUpload from '@/components/atoms/icons/IconUpload';
import InputFile, { InputFileHandle } from '@/components/atoms/InputFile';
import Texts from '@/components/atoms/Texts';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styled, { useTheme } from 'styled-components';

interface StyledFakeInputProps {
  $variant?: 'solid' | 'dashed';
  $minWidth?: string;
  $padding?: string;
}

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  background-color: oklch(0.967 0.0029 264.54);
  padding: 1rem;
  border-radius: 3.75rem;
`;

const StyledFakeInput = styled.button<
  StyledFakeInputProps & { $isDragging?: boolean }
>`
  background: ${props =>
    props.$isDragging
      ? props.theme.colors.primary + '10'
      : props.$variant === 'solid'
        ? props.theme.colors.card
        : 'transparent'};
  display: flex;
  flex-direction: column;
  padding: ${props => props.$padding || '2rem 1.5rem 1.5rem'};
  border-radius: 0.625rem;
  border-width: 0.125rem;
  border-style: ${props => (props.$variant === 'dashed' ? 'dashed' : 'solid')};
  border-color: ${props =>
    props.$isDragging ? props.theme.colors.primary : props.theme.colors.border};
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease-in-out;
  ${props => props.$minWidth && `min-width: ${props.$minWidth};`}

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const StyledButtonLike = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primaryForeground};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: ${props => props.theme.fonts.size.xs};
  line-height: ${props => props.theme.fonts.lineHeight.xs};
  font-weight: ${props => props.theme.fonts.weight.medium};
  border: none;
  user-select: none;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface FakeInputProps {
  placeholder: string;
  helperText: string;
  typesAccepted: string;
  onFileSelect?: (file: File | null) => void;
  variant?: 'solid' | 'dashed';
  minWidth?: string;
  padding?: string;
  spanButtonText: string;
}

export type FakeInputHandle = InputFileHandle;

function _FakeInput(
  { variant = 'dashed', ...props }: FakeInputProps,
  ref: React.Ref<FakeInputHandle>
) {
  const [isDragging, setIsDragging] = React.useState(false);
  const theme = useTheme();
  const inputFileRef = useRef<InputFileHandle>(null);

  useImperativeHandle(ref, () => ({
    open: () => inputFileRef.current?.open(),
    reset: () => inputFileRef.current?.reset(),
    getFile: () => inputFileRef.current?.getFile() ?? null,
    handleManualFileSelect: (file: File | null) =>
      inputFileRef.current?.handleManualFileSelect(file),
  }));

  const handleOpenFileDialog = () => {
    inputFileRef.current?.open();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      inputFileRef.current?.handleManualFileSelect(files[0]);
    }
  };

  return (
    <StyledFakeInput
      tabIndex={0}
      onClick={handleOpenFileDialog}
      $variant={variant}
      $minWidth={props.minWidth}
      $padding={props.padding}
      $isDragging={isDragging}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      type="button"
    >
      <IconWrapper>
        <IconUpload
          size={theme.icons.size.lg}
          stroke={theme.colors.mutedForeground}
        />
      </IconWrapper>
      <TextWrapper>
        <Texts
          text={props.placeholder}
          size={{
            fontSize: theme.fonts.size.sm,
            lineHeight: theme.fonts.lineHeight.sm,
          }}
          color={theme.colors.foreground}
        />
        <Texts
          text={props.helperText}
          size={{
            fontSize: theme.fonts.size.xs,
            lineHeight: theme.fonts.lineHeight.xs,
          }}
          color={theme.colors.mutedForeground}
        />
      </TextWrapper>
      <StyledButtonLike>
        <Texts
          type="span"
          text={props.spanButtonText}
          size={{
            fontSize: theme.fonts.size.xs,
            lineHeight: theme.fonts.lineHeight.xs,
          }}
          color={theme.colors.primaryForeground}
        />
      </StyledButtonLike>
      <InputFile
        ref={inputFileRef}
        typesAccepted={props.typesAccepted}
        onFileSelect={props.onFileSelect}
      />
    </StyledFakeInput>
  );
}

const FakeInputMemo = React.memo(
  forwardRef<FakeInputHandle, FakeInputProps>(_FakeInput)
);

const FakeInput = forwardRef<FakeInputHandle, FakeInputProps>((props, ref) => {
  return <FakeInputMemo {...props} ref={ref} />;
});

FakeInput.displayName = 'FakeInput';

export default FakeInput;
export type { FakeInputProps };
