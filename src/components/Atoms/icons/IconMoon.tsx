import React from 'react';
import { IIconParams } from '@/lib/types/IIconParams';

function _SvgComponent(props: IIconParams) {
    const {
        size = '100%',
        color = null,
        disableFill = true,
        removeInlineStyle = false,
        transform,
        style = {
            width: '',
            height: '',
            display: 'inline-block',
            stroke: 'currentColor',
            fill: 'currentColor',
        },
        stroke = 'none'
    } = props;

    if (size) {
        style.width = size;
        style.height = size;
    }

    if (color) {
        style.fill = color;
        style.stroke = color;
    }

    if (stroke !== 'none') {
        style.stroke = stroke;
    }

    if (transform) {
        style.transform = transform;
    }

    let finalProps: {[key: string] : any} = {};
    finalProps['viewBox'] = '0 0 24 24';
    finalProps['style'] = {
        ...(removeInlineStyle ? {} : style),
        ...(style || {}),
    };

    return (<svg data-testid="__name" xmlns="http://www.w3.org/2000/svg" {...finalProps}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon size-4" aria-hidden="true"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>
    </svg>);
}

const __IconMoon = React.memo(_SvgComponent);
export default __IconMoon;
