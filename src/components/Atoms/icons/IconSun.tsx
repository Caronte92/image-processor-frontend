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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun size-4" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
    </svg>);
}

const __IconSun = React.memo(_SvgComponent);
export default __IconSun;
