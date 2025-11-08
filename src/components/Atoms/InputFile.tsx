import React, { ChangeEvent, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
    display: none;
`;

export interface InputFileHandle {
    open: () => void;
    reset: () => void;
    getFile: () => File | null;
}

interface InputFileProps {
    onFileSelect?: React.Dispatch<React.SetStateAction<File | null>>;
}

function _InputFile(props: InputFileProps, ref: React.Ref<InputFileHandle>) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [, setError] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
        open: () => inputRef.current?.click(),
        reset: () => {
            if (inputRef.current) inputRef.current.value = '';
            setError(null);
        },
        getFile: () => inputRef.current?.files?.[0] ?? null,
    }));

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const file = event.target.files?.[0] ?? null;
        if (!file) {
            props.onFileSelect?.(null);
            return;
        }

        const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
        if (!isSvg) {
            setError('Por favor selecciona un archivo .svg válido.');
            inputRef.current!.value = '';
            props.onFileSelect?.(null);
            return;
        }

        props.onFileSelect?.(file);
    };

    return <Input type="file" accept=".svg" ref={inputRef} onChange={handleChange} />;
}

const ForwardedInputFile = forwardRef<InputFileHandle, InputFileProps>(_InputFile);

const InputFileMemo = React.memo(ForwardedInputFile);

export default InputFileMemo;