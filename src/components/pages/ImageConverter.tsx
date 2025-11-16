import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
`;

interface ImageConverterProps {
}

function _ImageConverter({}: ImageConverterProps) {
    return (
        <Container>
        </Container>
    );
};

const ImageConverterMemo = React.memo(_ImageConverter);

export default function ImageConverter(props: ImageConverterProps) {
    return (
        <ImageConverterMemo {...props} />
    );
}