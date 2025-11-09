import Button from '@/components/atoms/Button';
import IconClose from '@/components/atoms/icons/IconClose';
import IconUpload from '@/components/atoms/icons/IconUpload';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import { formatFileSize } from '@/lib/services/utils/svg';
import { IFileSelected } from '@/lib/types/IFiles';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const Container = styled.div`
    background: ${props => props.theme.colors?.muted};
    padding: 0.75rem;
    border-radius: 0.625rem;
    align-items: center;
    justify-content: space-between;
    display: flex;
    gap: 1rem;
`;

const IonWrapper = styled.div`
    display: flex;
    width: 2rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.colors?.primary};
    opacity: 0.4;
    border-radius: 0.5rem;
`;

const ComponentInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

interface SvgFileSelectedProps {
    file: IFileSelected;
    onClickCallback: React.MouseEventHandler<HTMLButtonElement>;
}

function _SvgFileSelected(props: SvgFileSelectedProps) {
    const theme = useTheme();

    return (
        <Container>
            <ComponentInfoContainer>
                <IonWrapper>
                    <IconUpload size={theme.icons.xs} stroke={theme.colors.cardForeground} />
                </IonWrapper>
                <TitleSubtitle
                    title={props.file.name}
                    subtitle={formatFileSize(props.file.size)}
                    titleSize={theme.fonts.sm}
                    subtitleSize={theme.fonts.xs}
                />
            </ComponentInfoContainer>
            <Button
                size={theme.buttonSizes.md}
                color={theme.buttonColors.ghost}
                onClickCallback={props.onClickCallback}
            >
                <IconClose size={theme.icons.xs} stroke={theme.colors.cardForeground} />
            </Button>
        </Container>
    );
}

const SvgFileSelectedMemo = React.memo(_SvgFileSelected);

export default function SvgFileSelected(props: SvgFileSelectedProps) {
    return <SvgFileSelectedMemo {...props} />;
}
