import React from 'react';
import styled from 'styled-components';
import SvgSection from '../organism/SvgSection';

const Container = styled.div`
    display: flex;
    gap: 1.5rem;
`;

const WrapperSpace = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

function _ReactToSvg() {
    return (
        <Container>
            <WrapperSpace>
                <SvgSection />
            </WrapperSpace>
            <WrapperSpace></WrapperSpace>
        </Container>
    );
}

const ReactToSvgMemo = React.memo(_ReactToSvg);

export default function ReactToSvg() {
    return <ReactToSvgMemo />;
}
