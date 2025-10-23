'use client';

import ReactToSvg from '@/components/pages/ReactToSvg';
import { SubMenuItems } from '@/lib/enums/subMenu';
import { useSubmenu } from '@/lib/providers/SubmenuProvider';
import '@/styles/globals.css';
import React from 'react';
import { styled } from 'styled-components';
import BaseLayout from './base';

const Container = styled.div`
    background: ${props => props.theme.colors?.background};
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
`;

const Wrapper = styled.div`
    padding: 1.5rem 1rem;
    margin: 0 auto;
    width: 100%;
    max-width: 72rem;
`;

function _Home() {
    const { selected } = useSubmenu();

    let content: React.ReactNode;

    switch (selected) {
        case SubMenuItems.SVG_REACT:
            content = <ReactToSvg />;
            break;
        case SubMenuItems.IMAGE_CONVERTER:
            content = <p>Image Converter</p>;
            break;
        case SubMenuItems.FAVICON_GENERATOR:
            content = <p>Favicon Generator</p>;
            break;
        default:
            content = <p>Selecciona una opción</p>;
            break;
    }

    return <Container>
        <Wrapper>
            {content}
        </Wrapper>
    </Container>;
}

const HomeMemo = React.memo(_Home);

export default function Home() {
    return (
        <BaseLayout>
            <HomeMemo />
        </BaseLayout>
    );
}
