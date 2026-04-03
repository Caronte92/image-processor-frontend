import Button from '@/components/atoms/Button';
import IconClose from '@/components/atoms/icons/IconClose';
import IconUpload from '@/components/atoms/icons/IconUpload';
import Texts from '@/components/atoms/Texts';
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
  width: 100%;
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
  justify-content: flex-start;
  gap: 1rem;
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
          <IconUpload
            size={theme.icons.xs}
            stroke={theme.colors.cardForeground}
          />
        </IonWrapper>
        <Texts
          text={props.file.name}
          color={theme.colors.foreground}
          size={theme.fonts.sm}
          truncate={true}
        />
      </ComponentInfoContainer>
      <ButtonWrapper>
        <Texts
          text={formatFileSize(props.file.size)}
          color={theme.colors.foreground}
          size={theme.fonts.xs}
        />
      <Button
        size={theme.buttonSizes.md}
        color={theme.buttonColors.ghost}
        onClickCallback={props.onClickCallback}
      >
        <IconClose size={theme.icons.xs} stroke={theme.colors.cardForeground} />
      </Button>
      </ButtonWrapper>
    </Container>
  );
}

const SvgFileSelectedMemo = React.memo(_SvgFileSelected);

export default function SvgFileSelected(props: SvgFileSelectedProps) {
  return <SvgFileSelectedMemo {...props} />;
}
