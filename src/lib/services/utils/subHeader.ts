import React from 'react';
import IconCode from '@/components/atoms/icons/IconCode';
import IconPicture from '@/components/atoms/icons/IconPicture';
import IconStar from '@/components/atoms/icons/IconStar';

export function subHeaderIcon(key: number | string, size: string) {
    if (typeof key === 'number') {
        switch (key) {
            case 0:
                return React.createElement(IconCode, { size });
            case 1:
                return React.createElement(IconPicture, { size });
            case 2:
                return React.createElement(IconStar, { size });
            default:
                return React.createElement(IconCode, { size });
        }
    }

    const normalized = String(key).toLowerCase();
    switch (normalized) {
        case 'code':
            return React.createElement(IconCode, { size });
        case 'star':
            return React.createElement(IconStar, { size });
        case 'image':
        case 'picture':
            return React.createElement(IconPicture, { size });
        default:
            return React.createElement(IconCode, { size });
    }
}