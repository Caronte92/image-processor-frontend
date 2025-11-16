import Texts from '@/components/atoms/Texts';
import { Typography } from '@/theme';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

interface IconAndTextProps {
    text: string;
    size?: Typography;
    color: string;
    fontWeight?: string;
    icon: React.ReactNode;
}

function _IconAndText(props: IconAndTextProps) {
    return (
        <Container>
            {props.icon}
            <Texts text={props.text} size={props.size} color={props.color} fontWeight={props.fontWeight} />
        </Container>
    );
}

const IconAndTextMemo = React.memo(_IconAndText);

export default function IconAndText(props: IconAndTextProps) {
    return <IconAndTextMemo {...props} />;
}
