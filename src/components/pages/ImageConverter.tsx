import React, { useState } from 'react';
import styled from 'styled-components';
import ImageSection from '../organism/imageConverter/ImageSection';
import ConfigurationsSection from '@/components/organism/imageConverter/CofigurationsSection';

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
    const [svgName, setSvgName] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSvgName = (value: string) => {
        setSvgName(value);
    };

    const generateComponent = async (file: File | Blob) => {
        if (!file) return;
    };

    const computeName = (file: File | null, input: string): string | undefined => {
        const trimmed = input.trim();
        if (trimmed) return trimmed;
        if (file?.name) {
            const base = file.name.replace(/\.[^/.]+$/, '');
            return base || undefined;
        }
        return undefined;
    };

    return (
        <Container>
            <WrapperSpace>
                <ImageSection
                    file={selectedFile ?? null}
                    onFileSelect={setSelectedFile}
                    onChangeCallback={e => handleSvgName(e.target.value)}
                    onClickCallback={async () => {
                        if (selectedFile) {
                            const name = computeName(selectedFile, svgName);
                            await generateComponent(selectedFile, name);
                        }
                    }}
                />
                <ConfigurationsSection />
            </WrapperSpace>
            <WrapperSpace>dasfdsaf</WrapperSpace>
        </Container>
    );
}

const ImageConverterMemo = React.memo(_ImageConverter);

export default function ImageConverter() {
    return <ImageConverterMemo />;
}
