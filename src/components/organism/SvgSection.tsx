import Wrapper from '@/components/atoms/Wrapper';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import InputFile, { InputFileHandle } from '@/components/atoms/InputFile';
import { styled, useTheme } from 'styled-components';
import Texts from '@/components/atoms/Texts';
import InputLabel from '@/components/molecules/InputLabel';
import Button from '@/components/atoms/Button';

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

const FakeSVG = styled.div`
    background: red;
    width: 2rem;
    height: 2rem;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
`;

interface SvgSectionProps {
    isGenerateComponentAvailable: boolean;
    file: {
        name: string;
        size: number;
    } | null;
    onFileSelect?: React.Dispatch<React.SetStateAction<File | null>>;
    onChangeCallback: React.ChangeEventHandler<HTMLInputElement>;
    onClickCallback: React.MouseEventHandler<HTMLButtonElement>;
}

function _SvgSection({ isGenerateComponentAvailable, ...props }: SvgSectionProps) {
    const t = useTranslations('SvgToReact');
    const theme = useTheme();
    const inputFileRef = useRef<InputFileHandle>(null);

    const handleOpenFileDialog = () => {
        inputFileRef.current?.open();
    };

    return (
        <Wrapper>
            <TitleSubtitle title={t('file_section_title')} subtitle={t('file_section_subtitle')} />
            <FileContainer>
                <FakeInput tabIndex={0} onClick={handleOpenFileDialog}>
                    <FakeSVG />
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
                    <InputFile ref={inputFileRef} onFileSelect={props.onFileSelect} />
                </FakeInput>
                {props.file && (
                    <>
                        <Texts text={props.file.name} size={theme.fonts.xs} color={theme.colors.mutedForeground} />
                    </>
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
