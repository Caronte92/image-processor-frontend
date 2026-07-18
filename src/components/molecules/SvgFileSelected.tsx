import Button from '@/components/atoms/Button';
import IconClose from '@/components/atoms/icons/IconClose';
import IconUpload from '@/components/atoms/icons/IconUpload';
import Texts from '@/components/atoms/Texts';
import { formatFileSize } from '@/lib/services/utils/svg';
import { IFileSelected } from '@/lib/types/IFiles';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import styled from 'styled-components';
import { colorVar } from '@/styles/colorVars';
import { fonts } from '@/styles/fonts';
import { icons } from '@/styles/icons';
import { buttonSizes, buttonStyles } from '@/styles/buttons';
import { theme } from '@/styles/theme';
import { breakpoints } from '@/styles/breakpoints';

const Container = styled.div`
  background: ${colorVar.muted};
  padding: 0.75rem;
  border-radius: 0.625rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const IonWrapper = styled.div<{ $hasThumbnail?: boolean }>`
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  background: ${props => (props.$hasThumbnail ? 'transparent' : colorVar.primary)};
  opacity: ${props => (props.$hasThumbnail ? 1 : 0.4)};
  border-radius: 0.5rem;
  flex-shrink: 0;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

  @media (max-width: ${breakpoints.xs}){
    flex-direction: column;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const SizeWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
    overflow: hidden;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

interface SvgFileSelectedProps {
  file: IFileSelected;
  estimated: number;
  onClickCallback: React.MouseEventHandler<HTMLButtonElement>;
}

function _SvgFileSelected(props: SvgFileSelectedProps) {
  const t = useTranslations('ImageConverter');
  const [imgError, setImgError] = useState(false);
  const showThumbnail = !!props.file.url && !imgError;

  return (
    <Container>
      <ComponentInfoContainer>
        <IonWrapper $hasThumbnail={showThumbnail}>
          {showThumbnail ? (
            <Thumbnail
              src={props.file.url}
              alt={props.file.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <IconUpload size={icons.size.xs} stroke={colorVar.cardForeground} />
          )}
        </IonWrapper>
        <SizeWrapper>
          <Texts
            text={props.file.name}
            color={colorVar.foreground}
            size={{
              fontSize: fonts.size.sm,
              lineHeight: fonts.lineHeight.sm,
            }}
            truncate={true}
          />
          <Texts
            text={t('file_selected_size', {
              size: formatFileSize(props.file.size),
            })}
            color={colorVar.foreground}
            size={{
              fontSize: fonts.size.xs,
              lineHeight: fonts.lineHeight.xs,
            }}
          />
        </SizeWrapper>
      </ComponentInfoContainer>
      <ButtonWrapper>
        <Texts
          type="label"
          text={t('file_selected_estimated_size', {
            size: formatFileSize(props.estimated),
          })}
          color={colorVar.mutedForeground}
          size={{
            fontSize: fonts.size.xs,
            lineHeight: fonts.lineHeight.xs,
          }}
        />
        <Button
          size={buttonSizes.md}
          color={buttonStyles.ghost}
          onClickCallback={props.onClickCallback}
        >
          <IconClose size={icons.size.xs} stroke={colorVar.cardForeground} />
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const SvgFileSelectedMemo = React.memo(_SvgFileSelected);

export default function SvgFileSelected(props: SvgFileSelectedProps) {
  return <SvgFileSelectedMemo {...props} />;
}
