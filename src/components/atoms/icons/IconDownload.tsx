import { IIconParams } from '@/lib/types/IIconParams';
import React from 'react';

const IconDownload = React.forwardRef<SVGSVGElement, IIconParams>(
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
        data-testid="IconDownload"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        style={removeInlineStyle ? undefined : mergedStyle}
      >
        <path d="M12 15V3" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="m7 10 5 5 5-5" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
);

IconDownload.displayName = 'IconDownload';
export default React.memo(IconDownload);
