import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import { formatFileSize } from '@/lib/services/utils/svg';
import { IFileSelected } from '@/lib/types/IFiles';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: ${props => props.theme.colors?.muted};
    padding: 0.75rem;
    border-radius: 0.625rem;
    align-items: center;
    justify-content: space-between;
    display: flex;
    gap: 1rem;
`;

interface SvgFileSelectedProps {
    file: IFileSelected;
}

function _SvgFileSelected(props: SvgFileSelectedProps) {
    return (
        <Container>
            <TitleSubtitle title={props.file.name} subtitle={formatFileSize(props.file.size)} />
        </Container>
    );
}

const SvgFileSelectedMemo = React.memo(_SvgFileSelected);

export default function SvgFileSelected(props: SvgFileSelectedProps) {
    return <SvgFileSelectedMemo {...props} />;
}
