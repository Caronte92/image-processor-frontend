import { ButtonColorState, ButtonSize } from '@/theme';
import React from 'react';
import styled from 'styled-components';

const getBorder = (enabled: boolean, enabledBorder: string, disabledBorder: string) => {
    let borderBase = '0.125em solid';
    if (enabled) return enabledBorder !== '' ? `${borderBase} ${enabledBorder}` : 'transparent';
    return disabledBorder !== '' ? `${borderBase} ${disabledBorder}` : 'transparent';
};

const Container = styled.button<{ $color: ButtonColorState; $size: ButtonSize; $enabled: boolean }>`
    padding: ${props => props.$size.padding};
    color: ${props => (props.$enabled ? props.$color.default.content : props.$color.disabled.content)};
    background-color: ${props => (props.$enabled ? props.$color.default.background : props.$color.disabled.background)};
    cursor: ${props => (props.$enabled ? 'pointer' : 'inherit')};
    border: ${props => getBorder(props.$enabled, props.$color.default.border, props.$color.disabled.border)};
    border-radius: 0.25em;
    opacity: ${props => (props.$enabled ? 'unset' : '0.4')};
    gap: 0.5em;

    &:hover {
        color: ${props => (props.$enabled ? props.$color.hover.content : props.$color.disabled.content)};
        background-color: ${props =>
            props.$enabled ? props.$color.hover.background : props.$color.disabled.background};
        border: ${props => getBorder(props.$enabled, props.$color.hover.border, props.$color.disabled.border)};
    }
`;

interface ButtonProps {
    children: React.ReactNode;
    size: ButtonSize;
    color: ButtonColorState;
    disabled?: boolean;
    onClickCallback: React.MouseEventHandler<HTMLButtonElement>;
}

function _Button({ children, size, color, disabled, onClickCallback }: ButtonProps) {
    const _handleOnclick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClickCallback(event);
    };

    return (
        <Container $color={color} $size={size} $enabled={!disabled} onClick={_handleOnclick}>
            {children}
        </Container>
    );
}

const ButtonMemo = React.memo(_Button);

export default function Button(props: ButtonProps) {
    return <ButtonMemo {...props} />;
}
