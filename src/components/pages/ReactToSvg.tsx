import React, { useState } from 'react';
import styled from 'styled-components';
import SvgSection from '../organism/SvgSection';
import { template } from '@/components/template/reactToSvg/template';
import { cleanSvg, CleanSvgResult } from '@/lib/services/utils/svg';

const Container = styled.div`
    display: flex;
    gap: 1.5rem;
`;

const WrapperSpace = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

function _ReactToSvg() {
    const [svgName, setSvgName] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [generatedCode, setGeneratedCode] = useState('');

    const handleSvgName = (value: string) => {
        setSvgName(value);
    };

    const generateComponent = async (file: File | Blob, svgName: string ) => {
        if (!file) return;
        const svgContent = await file.text();
        const { children, viewBox, width, height }: CleanSvgResult = cleanSvg(svgContent);
        const code = template(svgName, children, viewBox, width, height);
        setGeneratedCode(code);
    };

    return (
        <Container>
            <WrapperSpace>
                <SvgSection
                    isGenerateComponentAvailable={selectedFile === null}
                    file={selectedFile ?? null}
                    onFileSelect={setSelectedFile}
                    onChangeCallback={e => handleSvgName(e.target.value)}
                    onClickCallback={async () => {
                        if (selectedFile && svgName) {
                            await generateComponent(selectedFile, svgName);
                        }
                    }}
                />
            </WrapperSpace>
            <WrapperSpace>{generatedCode}</WrapperSpace>
        </Container>
    );
}

const ReactToSvgMemo = React.memo(_ReactToSvg);

export default function ReactToSvg() {
    return <ReactToSvgMemo />;
}
