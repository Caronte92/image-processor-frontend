import Input from '@/components/atoms/Input';
import Texts from '@/components/atoms/Texts';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: .5rem;
`;

interface ComponentNameProps {
    label: string;
    placeholder: string;
    onChangeCallback: React.ChangeEventHandler<HTMLInputElement>;
}

function _ComponentName(props: ComponentNameProps) {
    const theme = useTheme();
    return (
        <Container>
            <Texts text={props.label} color={theme.colors.foreground} />
            <Input placeholder={props.placeholder} onChangeCallback={props.onChangeCallback} />
        </Container>
    );
};

const ComponentNameMemo = React.memo(_ComponentName);

export default function ComponentName(props: ComponentNameProps) {
    return (
        <ComponentNameMemo {...props} />
    );
}