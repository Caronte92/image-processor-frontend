import { IIconParams } from '@/lib/types/IIconParams';
import React from 'react';
const IconWorld = React.forwardRef<SVGSVGElement, IIconParams>(
    (
        {
            size = '24px',
            color,
            disableFill = false,
            removeInlineStyle = false,
            transform,
            style,
            className,
            stroke = 'currentColor',
            viewBox = '0 0 24 24',
            ariaLabel = 'icon',
        },
        ref
    ) => {
        const mergedStyle: React.CSSProperties = {
            display: 'inline-block',
            fill: disableFill ? 'none' : (color ?? 'currentColor'),
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
                data-testid="IconWorld"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={viewBox}
                style={removeInlineStyle ? undefined : mergedStyle}
            >
                {' '}
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="M2 12h20"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />{' '}
            </svg>
        );
    }
);
IconWorld.displayName = 'IconWorld';
export default React.memo(IconWorld);
