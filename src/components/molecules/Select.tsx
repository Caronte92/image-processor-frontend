import React, { useState } from 'react';
import IconChevronDown from '@/components/atoms/icons/IconChevronDown';
import styled, { useTheme } from 'styled-components';
import Texts from '@/components/atoms/Texts';
import { IOptionsSelect } from '@/lib/types/IOptions';
import { ButtonColorState, ButtonSize } from '@/theme';

const getBorder = (enabled: boolean, enabledBorder: string, disabledBorder: string) => {
    let borderBase = '0.0625em solid';
    if (enabled) return enabledBorder !== '' ? `${borderBase} ${enabledBorder}` : 'transparent';
    return disabledBorder !== '' ? `${borderBase} ${disabledBorder}` : 'transparent';
};

const ButtonSelect = styled.button<{
    $color: ButtonColorState;
    $size: ButtonSize;
    $enabled: boolean;
    $selected?: boolean;
    $hideBorder: boolean;
}>`
    padding: ${props => props.$size.padding};
    color: ${props =>
        props.$enabled
            ? props.$selected
                ? props.$color.selected
                : props.$color.default.content
            : props.$color.disabled.content};
    background-color: ${props =>
        props.$enabled
            ? props.$selected
                ? props.$color.selected
                : props.$color.default.background
            : props.$color.disabled.background};
    cursor: ${props => (props.$enabled ? 'pointer' : 'not-allowed')};
    border: ${({ $enabled, $color, $hideBorder }) =>
        $hideBorder ? 'transparent' : getBorder($enabled, $color.default.border, $color.disabled.border)};
    border-radius: 0.25em;
    opacity: ${props => (props.$enabled ? 'unset' : '0.4')};
    gap: 0.5em;
    align-items: center;
    justify-content: center;

    &:hover {
        color: ${props => (props.$enabled ? props.$color.hover.content : props.$color.disabled.content)};
        background-color: ${props =>
            props.$enabled ? props.$color.hover.background : props.$color.disabled.background};
        border: ${({ $enabled, $color, $hideBorder }) =>
            $hideBorder ? 'transparent' : getBorder($enabled, $color.default.border, $color.disabled.border)};
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;

const DropdownContainer = styled.div`
    background-color: ${props => props.theme.colors?.background || props.theme.background};
    border: 1px solid ${props => props.theme.colors?.border};
    display: flex;
    flex-direction: column;
    position: absolute;
    cursor: pointer;
    border-radius: 0.5rem;
    margin: 1rem 0 0 -0.875rem;
    width: 6.5625rem;
    gap: 0.5rem;
`;

const OptionContainer = styled.div`
    color: ${({ theme }) => theme.colors.foreground};
    background: 'transparent'
    border: 'transparent';
    padding: .5rem .75rem;

    &:hover {
        background: ${({ theme }) => theme.colors.accent};
    }
`;

const OptionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;

interface SelectProps {
    text: string;
    icon?: React.ReactNode;
    options: IOptionsSelect[];
    onclickCallback: React.MouseEventHandler<HTMLElement>;
    children: React.ReactNode;
    size: ButtonSize;
    color: ButtonColorState;
    disabled?: boolean;
    selected?: boolean;
    hideBorder?: boolean;
}

function _Select({ hideBorder = false, ...props }: SelectProps) {
    const theme = useTheme();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const _handleOnclick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <ButtonSelect
            $color={props.color}
            $size={props.size}
            $enabled={!props.disabled}
            $selected={props.selected}
            $hideBorder={hideBorder}
            onClick={_handleOnclick}
        >
            <Container>
                {props.icon && props.icon}
                <Texts
                    type={'p'}
                    text={props.text}
                    size={theme.fonts?.sm}
                    fontWeight={theme.weights?.bold}
                    color={theme.colors?.foreground}
                />
                <IconChevronDown size={theme.icons.xs} />
            </Container>
            {isDropdownVisible && (
                <DropdownContainer>
                    {props.options.map(option => (
                        <OptionContainer
                            key={option.value}
                            data-value={option.value}
                            onClick={props.onclickCallback}
                        >
                            <OptionWrapper>
                                <Texts
                                    type={'p'}
                                    text={option.text}
                                    size={theme.fonts.sm}
                                    fontWeight={theme.weights.regular}
                                    color={theme.colors?.foreground}
                                />
                            </OptionWrapper>
                        </OptionContainer>
                    ))}
                </DropdownContainer>
            )}
        </ButtonSelect>
    );
}

const SelectMemo = React.memo(_Select);

export default function Select(props: SelectProps) {
    return <SelectMemo {...props} />;
}
