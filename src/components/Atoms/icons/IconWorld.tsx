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

    return (<svg data-testid="__IconWorld" xmlns="http://www.w3.org/2000/svg" {...finalProps}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe size-4" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
    </svg>);
}

const __IconWorld = React.memo(_SvgComponent);
export default __IconWorld;