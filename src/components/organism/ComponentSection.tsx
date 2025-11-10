import Button from '@/components/atoms/Button';
import Texts from '@/components/atoms/Texts';
import Wrapper from '@/components/atoms/Wrapper';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { styled, useTheme } from 'styled-components';

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
`;

interface ComponentNameProps {
    svgComponent: string;
}

function _ComponentName(props: ComponentNameProps) {
    const t = useTranslations("SvgToReact");
    const theme = useTheme();
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
        link.download = 'Test.tsx';
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
                    size={theme.fonts.base}
                    color={theme.colors.cardForeground}
                />
                <ButtonsWrapper>
                    <Button
                        size={theme.buttonSizes.md}
                        color={theme.buttonColors.primary}
                        onClickCallback={copyToClipboard}
                    >
                        <Texts
                            text={t('component_section_button_copy')}
                            size={theme.fonts.sm}
                            color={theme.colors.cardForeground}
                        />
                    </Button>
                    <Button
                        size={theme.buttonSizes.md}
                        color={theme.buttonColors.primary}
                        onClickCallback={downloadAsTSX}
                    >
                        <Texts
                            text={t('component_section_button_download')}
                            size={theme.fonts.sm}
                            color={theme.colors.cardForeground}
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
