import { IIconParams } from '@/lib/types/IIconParams';
import React from 'react';
const IconSun = React.forwardRef<SVGSVGElement, IIconParams>(
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
                data-testid="IconSun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={viewBox}
                style={removeInlineStyle ? undefined : mergedStyle}
            >
                {' '}
                <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="M12 2v2"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="M12 20v2"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="m4.93 4.93 1.41 1.41"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="m17.66 17.66 1.41 1.41"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="M2 12h2"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="M20 12h2"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="m6.34 17.66-1.41 1.41"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="m19.07 4.93-1.41 1.41"
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
IconSun.displayName = 'IconSun';
export default React.memo(IconSun);
