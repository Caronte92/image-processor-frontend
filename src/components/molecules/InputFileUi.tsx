import IconUpload from '@/components/atoms/icons/IconUpload';
import InputFile, { InputFileHandle } from '@/components/atoms/InputFile';
import Texts from '@/components/atoms/Texts';
import SvgFileSelected from '@/components/molecules/SvgFileSelected';
import { IFileSelected } from '@/lib/types/IFiles';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import styled, { useTheme } from 'styled-components';

const Container = styled.div`
    background: transparent;
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem 1.5rem;
    border-radius: 0.625rem;
    border: 0.125rem dashed ${props => props.theme.colors?.border};
    align-items: center;
    justify-content: center;
    gap: 1rem;
    cursor: pointer;

    &:hover {
        border: 0.125rem dashed ${props => props.theme.colors?.primary};
    }
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
`;

interface InputFileUiProps {
    file: IFileSelected;
    onFileSelectCallback?: React.Dispatch<React.SetStateAction<File | null>>;
}

function _InputFileUi(props: InputFileUiProps) {
    const theme = useTheme();
    const t = useTranslations('SvgToReact');
    const InputFileRef = useRef<InputFileHandle>(null);

    const handleOpenFileDialog = () => {
        InputFileRef.current?.open();
    };

    const handleClearFile = () => {
        InputFileRef.current?.reset();
        props.onFileSelectCallback?.(null);
    };

    return (
        <>
            <Container tabIndex={0} onClick={handleOpenFileDialog}>
                <IconUpload size={theme.icons.lg} stroke={theme.colors.mutedForeground} />
                <TextWrapper>
                    <Texts text={t('file_section_placeholder')} size={theme.fonts.sm} color={theme.colors.foreground} />
                    <Texts
                        text={t('file_section_span_info_extension')}
                        size={theme.fonts.xs}
                        color={theme.colors.mutedForeground}
                    />
                </TextWrapper>
                <InputFile ref={InputFileRef} typesAccepted='.png' onFileSelect={props.onFileSelectCallback} />
            </Container>
            {props.file && (
                <SvgFileSelected
                    file={{
                        name: props.file.name,
                        size: props.file.size,
                    }}
                    onClickCallback={handleClearFile}
                />
            )}
        </>
    );
}

const InputFileUiMemo = React.memo(_InputFileUi);

export default function InputFileUi(props: InputFileUiProps) {
    return <InputFileUiMemo {...props} />;
}
