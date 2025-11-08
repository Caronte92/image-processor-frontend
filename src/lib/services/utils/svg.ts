export function cleanSvg(svgContent: string): string {
    return svgContent
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}
