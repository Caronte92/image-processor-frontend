import { IIconParams } from '@/lib/types/IIconParams';
import React from 'react';

const IconCopy = React.forwardRef<SVGSVGElement, IIconParams>(
  ({
    size = '24px',
    color,
    disableFill = false,
    removeInlineStyle = false,
    transform,
    style,
    className,
    stroke = 'currentColor',
    viewBox = '0 0 24 24',
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
        data-testid="IconCopy"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        style={removeInlineStyle ? undefined : mergedStyle}
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
);

IconCopy.displayName = 'IconCopy';
export default React.memo(IconCopy);
