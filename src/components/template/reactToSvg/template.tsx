export function template(svgName: string, svgContent: string) {
    return `
import { IIconParams } from '@/lib/types/IIconParams';
import React from 'react';

const ${svgName} = React.forwardRef<SVGSVGElement, IIconParams>(
    (
        {
            size = '100%',
            color,
            disableFill = false,
            removeInlineStyle = false,
            transform,
            style,
            className,
            stroke = 'none',
            viewBox = '0 0 24 24',
            ariaLabel = 'icon',
        },
        ref
    ) => {
        const mergedStyle: React.CSSProperties = {
            display: 'inline-block',
            stroke: stroke !== 'none' ? stroke : 'currentColor',
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
                data-testid="${svgName}"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={viewBox}
                style={removeInlineStyle ? undefined : mergedStyle}
            >
                ${svgContent}
            </svg>
        );
    }
);

${svgName}.displayName = '${svgName}';

export default React.memo(${svgName});
`;
}
