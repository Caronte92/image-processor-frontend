import React, { useState } from 'react';
import styled from 'styled-components';
import SvgSection from '../organism/SvgSection';
import { template } from '@/components/template/reactToSvg/template';
import { cleanSvg, CleanSvgResult } from '@/lib/services/utils/svg';
import ComponentSection from '@/components/organism/ComponentSection';

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

function _ReactToSvg() {
    const [svgName, setSvgName] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [generatedCode, setGeneratedCode] = useState('');

    const handleSvgName = (value: string) => {
        setSvgName(value);
    };

    const generateComponent = async (file: File | Blob, svgName: string | undefined) => {
        if (!file) return;
        if (!svgName)
            svgName = 'SvgIcon';

        const svgContent = await file.text();
        const { children, viewBox, width, height }: CleanSvgResult = cleanSvg(svgContent);
        const code = template(svgName, children, viewBox, width, height);
        setGeneratedCode(code);
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
                <SvgSection
                    isGenerateComponentAvailable={selectedFile === null}
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
            </WrapperSpace>
            <WrapperSpace>
                { generatedCode &&
                    <ComponentSection svgComponent={ generatedCode } />
                }
            </WrapperSpace>
        </Container>
    );
}

const ReactToSvgMemo = React.memo(_ReactToSvg);

export default function ReactToSvg() {
    return <ReactToSvgMemo />;
}
