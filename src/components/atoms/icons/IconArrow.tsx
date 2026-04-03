import { IIconParams } from '@/lib/types/IIconParams';
import React from 'react';

const IconArrow = React.forwardRef<SVGSVGElement, IIconParams>(
  ({
    size = '11px',
    color,
    disableFill = false,
    removeInlineStyle = false,
    transform,
    style,
    className,
    stroke = 'currentColor',
    viewBox = '0 0 11 9',
    ariaLabel = 'icon'
  }, ref) => {
    const mergedStyle: React.CSSProperties = {
      display: 'inline-block',
      fill: disableFill ? 'none' : color ?? 'currentColor',
      width: size,
      height: size,
      transform,
      ...style,
    };

    return (
      <svg
        ref={ref}
        role="img"
        aria-label={ariaLabel}
        className={className}
        data-testid="IconArrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        style={removeInlineStyle ? undefined : mergedStyle}
      >
        <path d="M5.77699 8.90918L5.01136 8.1535L8.16335 5.00151H0V3.90776H8.16335L5.01136 0.765714L5.77699 8.89301e-05L10.2315 4.45463L5.77699 8.90918Z" fill="#6A7282" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
);

IconArrow.displayName = 'IconArrow';
export default React.memo(IconArrow);
