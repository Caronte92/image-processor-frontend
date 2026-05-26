'use client';

import React, {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

const Input = styled.input`
  display: none;
`;

export interface InputFileHandle {
  open: () => void;
  reset: () => void;
  getFile: () => File | null;
  handleManualFileSelect: (file: File | null) => void;
}

interface InputFileProps {
  typesAccepted: string;
  onFileSelect?: (file: File | null) => void;
}

function _InputFile(props: InputFileProps, ref: React.Ref<InputFileHandle>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [, setError] = useState<string | null>(null);

  const processFile = (file: File | null) => {
    setError(null);
    if (!file) {
      props.onFileSelect?.(null);
      return;
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      setError(
        'El archivo es demasiado grande. El peso máximo permitido es de 10 MB.'
      );
      if (inputRef.current) inputRef.current.value = '';
      props.onFileSelect?.(null);
      return;
    }

    const validImageTypes = [
      'image/svg+xml',
      'image/png',
      'image/webp',
      'image/jpeg',
      'image/jpg',
      'image/heic',
      'image/heif',
      'image/gif',
      'image/bmp',
    ];
    const validExtensions = props.typesAccepted
      .split(',')
      .map(type => type.trim());
    const fileExtension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0] || '';
    const isValidType = validImageTypes.includes(file.type);
    const isValidExtension = validExtensions.includes(fileExtension);

    if (!isValidType && !isValidExtension) {
      setError(
        'Por favor selecciona un archivo de imagen válido (.svg, .png, .webp, .jpg, .heic, .gif, .bmp).'
      );
      if (inputRef.current) inputRef.current.value = '';
      props.onFileSelect?.(null);
      return;
    }

    props.onFileSelect?.(file);
  };

  useImperativeHandle(ref, () => ({
    open: () => inputRef.current?.click(),
    reset: () => {
      if (inputRef.current) inputRef.current.value = '';
      setError(null);
    },
    getFile: () => inputRef.current?.files?.[0] ?? null,
    handleManualFileSelect: (file: File | null) => processFile(file),
  }));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      processFile(null);
    } else {
      files.forEach(file => processFile(file));
    }
  };

  return (
    <Input
      type="file"
      accept={props.typesAccepted}
      multiple
      ref={inputRef}
      onChange={handleChange}
    />
  );
}

const ForwardedInputFile = forwardRef<InputFileHandle, InputFileProps>(
  _InputFile
);

const InputFileMemo = React.memo(ForwardedInputFile);

export default InputFileMemo;
