import React, { useState } from 'react';
import styled from 'styled-components';
import ImageSection from '../organism/imageConverter/ImageSection';
import ConfigurationsSection from '@/components/organism/imageConverter/CofigurationsSection';
import { ImageFormats } from '@/lib/enums/imgFormats';
import { convertImages, ConvertedImage } from '@/lib/services/utils/images';
import DownloadSection from '@/components/organism/imageConverter/DownloadSection';

const Container = styled.div`
    display: flex;
    gap: 1.5rem;
`;

const WrapperSpace = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1 1 0;
    min-width: 0;
`;

function _ImageConverter() {
    const [, setSvgName] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const formats = [ImageFormats.WEBP, ImageFormats.JPEG, ImageFormats.PNG, ImageFormats.GIF];
    const [currentFormat, setCurrentFormat] = useState(formats[0]);
    const [formattedImage, setFormattedImage] = useState<ConvertedImage | null>(null);

    const handleSvgName = (value: string) => {
        setSvgName(value);
    };

    // const computeName = (file: File | null, input: string): string | undefined => {
    //     const trimmed = input.trim();
    //     if (trimmed) return trimmed;
    //     if (file?.name) {
    //         const base = file.name.replace(/\.[^/.]+$/, '');
    //         return base || undefined;
    //     }
    //     return undefined;
    // };

    const handleFormatChange = (newFormat: ImageFormats) => {
        setCurrentFormat(newFormat);
    };

    return (
        <Container>
            <WrapperSpace>
                <ImageSection
                    file={selectedFile ?? null}
                    onFileSelect={setSelectedFile}
                    onChangeCallback={e => handleSvgName(e.target.value)}
                />
                <ConfigurationsSection
                    formats={formats}
                    currentFormat={currentFormat}
                    isGenerateComponentAvailable={selectedFile === null}
                    onclickFormatCallback={handleFormatChange}
                    onClickCallback={async () => {
                        if (selectedFile) {
                            // const name = computeName(selectedFile, svgName);
                            let result = await convertImages(selectedFile, 800, 600, true, currentFormat, [100]);
                            if (result) {
                                setFormattedImage(result);
                            }
                        }
                    }}
                />
            </WrapperSpace>
            <WrapperSpace>
                {formattedImage && (
                    <DownloadSection file={formattedImage}></DownloadSection>
                )}
            </WrapperSpace>
        </Container>
    );
}

const ImageConverterMemo = React.memo(_ImageConverter);

export default function ImageConverter() {
    return <ImageConverterMemo />;
}
