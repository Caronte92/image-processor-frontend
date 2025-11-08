import React, { useState } from 'react';
import IconChevronDown from '@/components/atoms/icons/IconChevronDown';
import styled, { useTheme } from 'styled-components';
import Button from '@/components/atoms/Button';
import Texts from '@/components/atoms/Texts';
import { IOptionsSelect } from '@/lib/types/IOptions';

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
    onclickCallback: React.MouseEventHandler<HTMLButtonElement>;
}

function _Select(props: SelectProps) {
    const theme = useTheme();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    return (
        <Button
            color={theme.buttonColors.ghost}
            size={theme.buttonSizes?.md}
            onClickCallback={(e) => {
                setIsDropdownVisible(!isDropdownVisible);
                props.onclickCallback(e);
            }}
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
            {isDropdownVisible &&
                <DropdownContainer>
                    {props.options.map(option => (
                        <OptionContainer>
                            <OptionWrapper>
                                <Texts
                                    type={'p'}
                                    text={option.text}
                                    size={theme.fonts.sm}
                                    fontWeight={theme.weights.regular}
                                    color={theme.colors?.foreground}
                                />
                                {option.selected && <p>✅</p>}
                            </OptionWrapper>
                        </OptionContainer>
                    ))}
                </DropdownContainer>
            }
        </Button>
    );
}

const SelectMemo = React.memo(_Select);

export default function Select(props: SelectProps) {
    return <SelectMemo {...props} />;
}
