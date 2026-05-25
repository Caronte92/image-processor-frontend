import { ILinkVariantConfig } from '@/styles/links';
import { Typography } from '@/components/atoms/Texts';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Anch = styled(Link)<{
  $color: ILinkVariantConfig;
  $disabled: boolean;
  $active: boolean;
  $size?: Typography;
}>`
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  text-decoration: none;
  color: ${({ $color, $disabled, $active }) =>
    $disabled
      ? $color.disabled.color
      : $active
        ? $color.active.color
        : $color.neutral.color};
  border-bottom: 2px solid
    ${({ $color, $disabled, $active }) =>
      $disabled
        ? $color.disabled.underline
        : $active
          ? $color.active.underline
          : $color.neutral.underline};
  font-size: ${({ $size }) => $size?.fontSize ?? 'inherit'};
  line-height: ${({ $size }) => $size?.lineHeight ?? 'inherit'};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  transition:
    color 0.2s ease,
    border-bottom-color 0.2s ease;

  &:hover {
    color: ${({ $color, $disabled }) =>
      $disabled ? $color.disabled.color : $color.hover.color};
    border-bottom-color: ${({ $color, $disabled }) =>
      $disabled ? $color.disabled.underline : $color.hover.underline};
  }
`;

interface AnchorProps {
  href: string;
  target?: '_self' | '_blank';
  rel?: string;
  text: string;
  color: ILinkVariantConfig;
  size?: Typography;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
  download?: boolean | string;
}

function _Anchor({
  target = '_self',
  active = false,
  disabled = false,
  ...props
}: AnchorProps) {
  const rel =
    props.rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);

  return (
    <Anch
      href={disabled ? '#' : props.href}
      target={target}
      rel={rel}
      title={props.title}
      aria-label={props.ariaLabel}
      aria-disabled={disabled}
      aria-current={active ? 'page' : undefined}
      download={props.download}
      $color={props.color}
      $disabled={disabled}
      $active={active}
      $size={props.size}
      tabIndex={disabled ? -1 : undefined}
    >
      <p>{props.text}</p>
    </Anch>
  );
}

const AnchorMemo = React.memo(_Anchor);

export default function Anchor(props: AnchorProps) {
  return <AnchorMemo {...props} />;
}
