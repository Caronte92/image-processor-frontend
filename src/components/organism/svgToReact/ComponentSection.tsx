'use client';

import Button from '@/components/atoms/Button';
import IconCopy from '@/components/atoms/icons/IconCopy';
import IconDownload from '@/components/atoms/icons/IconDownload';
import Texts from '@/components/atoms/Texts';
import Wrapper from '@/components/atoms/Wrapper';
import IconAndText from '@/components/molecules/IconAndText';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { colorVar } from '@/styles/colorVars';
import { fonts } from '@/styles/fonts';
import { icons } from '@/styles/icons';
import { buttonSizes, buttonStyles } from '@/styles/buttons';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const CodeContainer = styled.pre`
  overflow: scroll;
  background: color-mix(in oklch, ${colorVar.input} 30%);
  border: 0.0625rem solid ${colorVar.input};
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
`;

interface ComponentNameProps {
  svgComponent: string;
  svgName: string;
}

function _ComponentName(props: ComponentNameProps) {
  const t = useTranslations('SvgToReact');
  const [, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(props.svgComponent)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Error al copiar: ', err);
      });
  };

  const downloadAsTSX = () => {
    const blob = new Blob([props.svgComponent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${props.svgName}.tsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Wrapper>
      <Header>
        <Texts
          text={t('component_section_title')}
          size={{
            fontSize: fonts.size.base,
            lineHeight: fonts.lineHeight.base,
          }}
          color={colorVar.cardForeground}
        />
        <ButtonsWrapper>
          <Button
            size={buttonSizes.md}
            color={buttonStyles.primary}
            onClickCallback={copyToClipboard}
          >
            <IconAndText
              icon={<IconCopy size={icons.size.xs} />}
              text={t('component_section_button_copy')}
              size={{
                fontSize: fonts.size.sm,
                lineHeight: fonts.lineHeight.sm,
              }}
              color={colorVar.cardForeground}
            />
          </Button>
          <Button
            size={buttonSizes.md}
            color={buttonStyles.primary}
            onClickCallback={downloadAsTSX}
          >
            <IconAndText
              icon={<IconDownload size={icons.size.xs} />}
              text={t('component_section_button_download')}
              size={{
                fontSize: fonts.size.sm,
                lineHeight: fonts.lineHeight.sm,
              }}
              color={colorVar.cardForeground}
            />
          </Button>
        </ButtonsWrapper>
      </Header>
      <CodeContainer>
        <code>{props.svgComponent}</code>
      </CodeContainer>
    </Wrapper>
  );
}

const ComponentNameMemo = React.memo(_ComponentName);

export default function ComponentName(props: ComponentNameProps) {
  return <ComponentNameMemo {...props} />;
}
