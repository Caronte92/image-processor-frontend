import { IIconParams } from '@/lib/types/IIconParams';
import React from 'react';

const IconPicture = React.forwardRef<SVGSVGElement, IIconParams>(
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
        data-testid="IconPicture"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        style={removeInlineStyle ? undefined : mergedStyle}
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="9" cy="9" r="2" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
);

IconPicture.displayName = 'IconPicture';
export default React.memo(IconPicture);
