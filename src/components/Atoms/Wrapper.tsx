import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: ${({ theme }) => theme.colors?.card};
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 0.0625rem solid ${({ theme }) => theme.colors?.border};
`;

interface WrapperProps {
    children: React.ReactNode;
}

function _Wrapper({ children }: WrapperProps) {
    return <Container>{children}</Container>;
}

const WrapperMemo = React.memo(_Wrapper);

export default function Wrapper(props: WrapperProps) {
    return <WrapperMemo {...props} />;
}
