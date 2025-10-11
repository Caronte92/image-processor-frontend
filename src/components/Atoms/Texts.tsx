import { Typography } from '@/theme';
import React from 'react';
import styled, { css } from 'styled-components';

type TextType = 'h1' | 'p' | 'label';

const IText = css<{ $size: Typography, $weight: string, $color: string }>`
    font-size: ${props => props.$size.fontSize};
    line-height: ${props => props.$size.lineHeight};
    font-weight: ${props => props.$weight};
    color: ${props => props.$color};
`;

const Paragraph = styled.p<{ $size: Typography, $weight: string, $color: string }>`
    ${IText}
`;

const Title = styled.h1<{ $size: Typography, $weight: string, $color: string }>`
    ${IText}
`;

const Label = styled.label<{ $size: Typography, $weight: string, $color: string }>`
   ${IText}
`;

interface TextProps {
    type: TextType
    text: string;
    size: Typography;
    fontWeight: string;
    color: string;
};

function _Text({ type = 'p', text, size, fontWeight, color }: TextProps) {
    switch (type){
        default: return <Paragraph $size={size} $weight={fontWeight} $color={color}> {text} </Paragraph>;
        case 'h1': return <Title $size={size} $weight={fontWeight} $color={color}> {text} </Title>;
        case 'label': return <Label $size={size} $weight={fontWeight} $color={color}> {text} </Label>;
    }
}

const TextMemo = React.memo(_Text);

export default function Text(props: TextProps) {
    return (
        <TextMemo {...props} />
    );
}