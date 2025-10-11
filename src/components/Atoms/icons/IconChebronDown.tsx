import { IIconParams } from '@/lib/types/IIconParams';
import React from 'react';

function _SvgComponent(props: IIconParams) {
    const {
        size = '100%',
        color = null,
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down size-4 opacity-50" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
    </svg>);
}

const __ChebronDown = React.memo(_SvgComponent);
export default __ChebronDown;
