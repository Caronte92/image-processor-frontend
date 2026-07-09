'use client';

import IconUpload from '@/components/atoms/icons/IconUpload';
import InputFile, { InputFileHandle } from '@/components/atoms/InputFile';
import Texts from '@/components/atoms/Texts';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { colorVar } from '@/styles/colorVars';
import { fonts } from '@/styles/fonts';
import { icons } from '@/styles/icons';

interface StyledFakeInputProps {
  $variant?: 'solid' | 'dashed';
  $minWidth?: string;
  $padding?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ErrorText = styled.p`
  color: ${colorVar.destructive};
  font-size: ${fonts.size.xs};
  line-height: ${fonts.lineHeight.xs};
  text-align: center;
  margin-top: 0.5rem;
`;

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
      ? colorVar.primary + '10'
      : props.$variant === 'solid'
        ? colorVar.card
        : 'transparent'};
  display: flex;
  flex-direction: column;
  padding: ${props => props.$padding || '2rem 1.5rem 1.5rem'};
  border-radius: 0.625rem;
  border-width: 0.125rem;
  border-style: ${props => (props.$variant === 'dashed' ? 'dashed' : 'solid')};
  border-color: ${props => (props.$isDragging ? colorVar.primary : colorVar.border)};
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease-in-out;
  ${props => props.$minWidth && `min-width: ${props.$minWidth};`}

  &:hover {
    border-color: ${colorVar.primary};
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
  background-color: ${colorVar.primary};
  color: ${colorVar.primaryForeground};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: ${fonts.size.xs};
  line-height: ${fonts.lineHeight.xs};
  font-weight: ${fonts.weight.medium};
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
  const [error, setError] = React.useState<string | null>(null);
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

    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      inputFileRef.current?.handleManualFileSelect(file);
    });
  };

  return (
    <Wrapper>
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
            size={icons.size.lg}
            stroke={colorVar.mutedForeground}
          />
        </IconWrapper>
        <TextWrapper>
          <Texts
            text={props.placeholder}
            size={{
              fontSize: fonts.size.sm,
              lineHeight: fonts.lineHeight.sm,
            }}
            color={colorVar.foreground}
          />
          <Texts
            text={props.helperText}
            size={{
              fontSize: fonts.size.xs,
              lineHeight: fonts.lineHeight.xs,
            }}
            color={colorVar.mutedForeground}
          />
        </TextWrapper>
        <StyledButtonLike>
          <Texts
            type="span"
            text={props.spanButtonText}
            size={{
              fontSize: fonts.size.xs,
              lineHeight: fonts.lineHeight.xs,
            }}
            color={colorVar.primaryForeground}
          />
        </StyledButtonLike>
        <InputFile
          ref={inputFileRef}
          typesAccepted={props.typesAccepted}
          onFileSelect={props.onFileSelect}
          onError={setError}
        />
      </StyledFakeInput>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
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
