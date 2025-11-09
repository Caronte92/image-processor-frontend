export interface SVGElementData {
    tag: string;
    attrs: Record<string, string>;
    children?: SVGElementData[];
}

export interface CleanSvgResult {
    children: SVGElementData[];
    viewBox: string;
    width?: string;
    height?: string;
}

export function cleanSvg(svgContent: string): CleanSvgResult {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svg = doc.documentElement;

    const viewBox = svg.getAttribute('viewBox') || '0 0 24 24';
    const width = svg.getAttribute('width') || undefined;
    const height = svg.getAttribute('height') || undefined;

    const inheritedAttrs = {
        stroke: svg.getAttribute('stroke'),
        'stroke-width': svg.getAttribute('stroke-width'),
        'stroke-linecap': svg.getAttribute('stroke-linecap'),
        'stroke-linejoin': svg.getAttribute('stroke-linejoin'),
        fill: svg.getAttribute('fill'),
    };

    function parseElement(el: Element): SVGElementData {
        const attrs: Record<string, string> = {};

        Array.from(el.attributes).forEach(a => {
            attrs[a.name] = a.value;
        });

        Object.entries(inheritedAttrs).forEach(([key, value]) => {
            if (value && !attrs[key]) {
                attrs[key] = value;
            }
        });

        if (el.tagName === 'path') {
            if (!attrs.stroke) attrs.stroke = 'currentColor';
            if (!attrs['stroke-width']) attrs['stroke-width'] = '2';
            if (!attrs['stroke-linecap']) attrs['stroke-linecap'] = 'round';
            if (!attrs['stroke-linejoin']) attrs['stroke-linejoin'] = 'round';
            if (!attrs.fill) attrs.fill = 'none';
        }

        const children = Array.from(el.children).map(parseElement);
        return {
            tag: el.tagName,
            attrs,
            children: children.length ? children : undefined,
        };
    }

    const children = Array.from(svg.children).map(parseElement);
    return { children, viewBox, width, height };
}

export function formatFileSize(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${value} ${sizes[i]}`;
}

export function generateJSX(elements: SVGElementData[]): string {
    return elements
        .map(el => {
            const attrPairs = Object.entries(el.attrs)
                .map(([k, v]) => {
                    const reactKey = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

                    if (reactKey === 'stroke' && v === 'currentColor') {
                        return `${reactKey}={stroke}`;
                    }
                    if (reactKey === 'fill' && v === 'none') {
                        return `${reactKey}="none"`; // Mantener fill="none" explícito
                    }

                    return `${reactKey}="${v}"`;
                })
                .join(' ');

            const childrenJSX = el.children ? generateJSX(el.children) : '';
            return childrenJSX ? `<${el.tag} ${attrPairs}>${childrenJSX}</${el.tag}>` : `<${el.tag} ${attrPairs} />`;
        })
        .join('');
}
