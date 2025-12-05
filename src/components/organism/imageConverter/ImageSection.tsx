import IconUpload from '@/components/atoms/icons/IconUpload';
import InputFile, { InputFileHandle } from '@/components/atoms/InputFile';
import Texts from '@/components/atoms/Texts';
import Wrapper from '@/components/atoms/Wrapper';
import SvgFileSelected from '@/components/molecules/SvgFileSelected';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import { IFileSelected } from '@/lib/types/IFiles';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import styled, { useTheme } from 'styled-components';

const FileContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FakeInput = styled.button`
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

interface ImageSectionProps {
    file: IFileSelected | null;
    onFileSelect?: React.Dispatch<React.SetStateAction<File | null>>;
    onChangeCallback: React.ChangeEventHandler<HTMLInputElement>;
    onClickCallback: React.MouseEventHandler<HTMLButtonElement>;
}

function _ImageSection(props: ImageSectionProps) {
    const t = useTranslations('ImageConverter');
    const theme = useTheme();
    const inputFileRef = useRef<InputFileHandle>(null);

    const handleOpenFileDialog = () => {
        inputFileRef.current?.open();
    };

    const handleClearFile = () => {
        inputFileRef.current?.reset();
        props.onFileSelect?.(null);
    };

    return (
        <Wrapper>
            <TitleSubtitle title={t('file_section_title')} subtitle={t('file_section_subtitle')} />
            <FileContainer>
                <FakeInput tabIndex={0} onClick={handleOpenFileDialog}>
                    <IconUpload size={theme.icons.lg} stroke={theme.colors.mutedForeground} />
                    <TextWrapper>
                        <Texts
                            text={t('file_section_placeholder')}
                            size={theme.fonts.sm}
                            color={theme.colors.foreground}
                        />
                        <Texts
                            text={t('file_section_span_info_extension')}
                            size={theme.fonts.xs}
                            color={theme.colors.mutedForeground}
                        />
                    </TextWrapper>
                    <InputFile ref={inputFileRef} typesAccepted='.png, .jpg, .gif, .bmp, .webp' onFileSelect={props.onFileSelect} />
                </FakeInput>
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
        </Wrapper>
    );
}

const ImageSectionMemo = React.memo(_ImageSection);

export default function ImageSection(props: ImageSectionProps) {
    return <ImageSectionMemo {...props} />;
}
