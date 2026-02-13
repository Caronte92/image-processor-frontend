'use client';

import { template } from '@/components/template/reactToSvg/template';
import { cleanSvg, CleanSvgResult } from '@/lib/services/utils/svg';
import Stepper from '@/components/molecules/Stepper';
import BaseLayout from '@/layouts/base';
import SvgSection from '@/components/organism/svgToReact/SvgSection';
import ComponentSection from '@/components/organism/svgToReact/ComponentSection';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 3rem 1.5rem;
  margin: 0 auto;
  width: 100%;
  max-width: 72rem;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function _SvgComponent() {
  const t = useTranslations('SvgComponent');

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [svgName, setSvgName] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleSvgName = (value: string) => {
    setSvgName(value);
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      setStep(2);
    } else {
      setStep(1);
    }
  };

  const computeName = (
    file: File | null,
    input: string
  ): string | undefined => {
    const trimmed = input.trim();
    if (trimmed) return trimmed;
    if (file?.name) {
      const base = file.name.replace(/\.[^/.]+$/, '');
      return base || undefined;
    }
    return undefined;
  };

  const handleGenerateComponent = async () => {
    if (!selectedFile) return;

    let name = computeName(selectedFile, svgName);
    if (!name) {
      name = 'SvgIcon';
    }

    const svgContent = await selectedFile.text();
    const { children, viewBox, width, height }: CleanSvgResult =
      cleanSvg(svgContent);
    const code = template(name, children, viewBox, width, height);
    setGeneratedCode(code);
  };

  const steps = [
    { isActive: step === 1, title: t('step_1_upload_svg') },
    { isActive: step === 2, title: t('step_2_generate') },
  ];

  return (
    <Wrapper>
      <Stepper steps={steps} />

      {step === 1 && (
        <SvgSection
          isGenerateComponentAvailable={selectedFile === null}
          file={selectedFile ?? null}
          onFileSelect={handleFileSelect}
          onChangeCallback={e => handleSvgName(e.target.value)}
          onClickCallback={handleGenerateComponent}
        />
      )}

      {step === 2 && selectedFile && (
        <SvgSection
          isGenerateComponentAvailable={selectedFile === null}
          file={selectedFile ?? null}
          onFileSelect={handleFileSelect}
          onChangeCallback={e => handleSvgName(e.target.value)}
          onClickCallback={handleGenerateComponent}
        />
      )}

      {generatedCode && (
        <ComponentSection svgComponent={generatedCode} svgName={svgName} />
      )}
    </Wrapper>
  );
}

const SvgComponentMemo = React.memo(_SvgComponent);

export default function SvgComponent() {
  return (
    <BaseLayout>
      <SvgComponentMemo />
    </BaseLayout>
  );
}
