import React from 'react';
import styled, { css } from 'styled-components';

type ThemeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl';
type WeightSize = 'regular' | 'medium' | 'semibold' | 'bold';

const IText = css<{ size: ThemeSize, weight: WeightSize, color: string }>`
    font-size: ${({ theme, size }) => theme[size].fontSize};
    line-height: ${({ theme, size }) => theme[size].lineHeight};
    font-weight: ${props => props.weight};
    color: ${props => props.color};
`;

const Paragraph = styled.p<{ size: ThemeSize, weight: WeightSize, color: string }>`
    ${IText}
`;

const Title = styled.h1<{ size: ThemeSize, weight: WeightSize, color: string }>`
    ${IText}
`;

const Label = styled.label<{ size: ThemeSize, weight: WeightSize, color: string }>`
    ${IText}
`;

export enum TextType {
    // h1,
    // p,
    // label
}

type TextProps = {
    type: TextType
    text: string;
    size: ThemeSize;
    fontWeight: WeightSize;
    color: string;
};

function _Text({ type = TextType.p, text, size, fontWeight, color }: TextProps) {
    switch (type){
        default: return <Paragraph size={size} weight={fontWeight} color={color}> {text} </Paragraph>;
        case TextType.h1: return <Title size={size} weight={fontWeight} color={color}> {text} </Title>;
        case TextType.label: return <Label size={size} weight={fontWeight} color={color}> {text} </Label>;
    }
}

const TextMemo = React.memo(_Text);

export default function Text(props: TextProps) {
    return (
        <TextMemo {...props} />
    );
}