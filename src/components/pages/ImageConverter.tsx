import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    gap: 1.5rem;
`;

const WrapperSpace = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1 1 0;
    min-width: 0;
`;

function _ImageConverter() {
    return (
        <Container>

        </Container>
    );
};

const ImageConverterMemo = React.memo(_ImageConverter);

export default function ImageConverter() {
    return (
        <ImageConverterMemo />
    );
}