import { theme, Typography } from '@/styles/theme';
import React from 'react';
import styled, { css } from 'styled-components';

type TextType = 'h1' | 'p' | 'label' | 'span';

const Truncate = css<{ $truncate: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IText = css<{ $size: Typography; $weight: string; $color: string }>`
  font-size: ${props => props.$size.fontSize};
  line-height: ${props => props.$size.lineHeight};
  font-weight: ${props => props.$weight};
  color: ${props => props.$color};
  width: fit-content;
`;

const Paragraph = styled.p<{
  $size: Typography;
  $weight: string;
  $color: string;
  $truncate: boolean;
}>`
  ${IText}
  ${props => props.$truncate && Truncate}
`;

const Title = styled.h1<{ $size: Typography; $weight: string; $color: string }>`
  ${IText}
`;

const Label = styled.label<{
  $size: Typography;
  $weight: string;
  $color: string;
  $truncate: boolean;
}>`
  ${IText}
  ${props => props.$truncate && Truncate}
`;

const Span = styled.span<{
  $size: Typography;
  $weight: string;
  $color: string;
  $truncate: boolean;
}>`
  ${IText}
  ${props => props.$truncate && Truncate}
`;

interface TextProps {
  type?: TextType;
  text: string;
  size?: Typography;
  fontWeight?: string;
  color: string;
  truncate?: boolean;
}

function _Text({
  type = 'p',
  size = theme.fonts.base,
  fontWeight = theme.weights.regular,
  truncate = false,
  ...props
}: TextProps) {
  switch (type) {
    default:
      return (
        <Paragraph
          $size={size}
          $weight={fontWeight}
          $color={props.color}
          $truncate={truncate}
        >
          {' '}
          {props.text}{' '}
        </Paragraph>
      );
    case 'h1':
      return (
        <Title $size={size} $weight={fontWeight} $color={props.color}>
          {' '}
          {props.text}{' '}
        </Title>
      );
    case 'label':
      return (
        <Label
          $size={size}
          $weight={fontWeight}
          $color={props.color}
          $truncate={truncate}
        >
          {' '}
          {props.text}{' '}
        </Label>
      );
    case 'span':
      return (
        <Span
          $size={size}
          $weight={fontWeight}
          $color={props.color}
          $truncate={truncate}
        >
          {' '}
          {props.text}{' '}
        </Span>
      );
  }
}

const TextMemo = React.memo(_Text);

export default function Text(props: TextProps) {
  return <TextMemo {...props} />;
}
