import React, { useState } from 'react';
import styled from 'styled-components';
import SvgSection from '../organism/SvgSection';
import { template } from '@/components/template/reactToSvg/template';
import { cleanSvg } from '@/lib/services/utils/svg';

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

    const generateComponent = async () => {
        if (selectedFile === null) return;

        const svgContent = await selectedFile.text();
        const svgNormalized = cleanSvg(svgContent);

        const code = template(svgName, svgNormalized);
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
                    onClickCallback={generateComponent}
                />
            </WrapperSpace>
            <WrapperSpace>
                {generatedCode}
            </WrapperSpace>
        </Container>
    );
}

const ReactToSvgMemo = React.memo(_ReactToSvg);

export default function ReactToSvg() {
    return <ReactToSvgMemo />;
}
