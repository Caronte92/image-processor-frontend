import { IIconParams } from '@/lib/types/IIconParams';
import React from 'react';
const IconChevronDown = React.forwardRef<SVGSVGElement, IIconParams>(
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
                data-testid="IconChevronDown"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={viewBox}
                style={removeInlineStyle ? undefined : mergedStyle}
            >
                {' '}
                <path
                    d="m6 9 6 6 6-6"
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
IconChevronDown.displayName = 'IconChevronDown';
export default React.memo(IconChevronDown);
