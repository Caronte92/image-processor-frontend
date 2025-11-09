import { generateJSX, SVGElementData } from '@/lib/services/utils/svg';

export function template(
    svgName: string,
    children: SVGElementData[],
    viewBox: string,
    width?: string,
    height?: string
) {
    // VERIFICACIÓN CRÍTICA - asegurar que svgName tenga valor
    const componentName = svgName || 'SvgIcon';
    const jsxContent = generateJSX(children);

    return `import { IIconParams } from '@/lib/types/IIconParams';
import React from 'react';

const ${componentName} = React.forwardRef<SVGSVGElement, IIconParams>(
  ({
    size = '${getSafeSize(width, height)}',
    color,
    disableFill = false,
    removeInlineStyle = false,
    transform,
    style,
    className,
    stroke = 'currentColor',
    viewBox = '${viewBox}',
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
        data-testid="${componentName}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        style={removeInlineStyle ? undefined : mergedStyle}
      >
        ${jsxContent}
      </svg>
    );
  }
);

${componentName}.displayName = '${componentName}';
export default React.memo(${componentName});
`;
}

// Función más robusta para el tamaño
function getSafeSize(width?: string, height?: string): string {
    if (!width && !height) return '100%';
    
    // Si ambos existen y son iguales, usar ese valor
    if (width && height && width === height) {
        const numValue = parseInt(width);
        return isNaN(numValue) ? '100%' : `${numValue}px`;
    }
    
    // Preferir width si existe y es numérico
    if (width) {
        const numValue = parseInt(width);
        if (!isNaN(numValue)) return `${numValue}px`;
    }
    
    // O height si es numérico
    if (height) {
        const numValue = parseInt(height);
        if (!isNaN(numValue)) return `${numValue}px`;
    }
    
    return '100%';
}