'use client';

import Button from '@/components/atoms/Button';
import IconArrow from '@/components/atoms/icons/IconArrow';
import Texts from '@/components/atoms/Texts';
import Wrapper from '@/components/atoms/Wrapper';
import IconAndText from '@/components/molecules/IconAndText';
import InputLabel from '@/components/molecules/InputLabel';
import Select from '@/components/molecules/Select';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import { ImageFormats } from '@/lib/enums/imgFormats';
import { useTranslations } from 'next-intl';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  text-align: center;
`;

const BasicSettings = styled.div`
  display: flex;
  gap: 1rem;

  > * {
    flex: 1 1 50%;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const AdvancedConfigs = styled.div``;

interface ConfigurationsSectionProps {
  title: string;
  subtitle: string;
  index: number;
  formats: ImageFormats[];
  currentFormat: ImageFormats;
  isGenerateComponentAvailable: boolean;
  totalFiles: number;

  onclickFormatCallback: (format: ImageFormats) => void;
  onClickCallback: React.MouseEventHandler<HTMLButtonElement>;
  onGoBackCallback: () => void;
  onChangeWidthCallback: React.ChangeEventHandler<HTMLInputElement>;
  onChangeHeightCallback: React.ChangeEventHandler<HTMLInputElement>;
  onChangeQualityCallback: React.ChangeEventHandler<HTMLInputElement>;
}

function _ConfigurationsSection({ ...props }: ConfigurationsSectionProps) {
  const t = useTranslations('ImageConverter');
  const theme = useTheme();

  const handleFormatClick: React.MouseEventHandler<HTMLElement> = event => {
    const value = event.currentTarget.dataset.value;
    if (value) {
      props.onclickFormatCallback(value as ImageFormats);
    }
  };

  const handleQuality: React.ChangeEventHandler<HTMLInputElement> = event => {
    const value = event.target.value;
    const quality = parseInt(value);

    if (!isNaN(quality) && quality >= 1 && quality <= 100) {
      props.onChangeQualityCallback(event);
    }
  };

  return (
    <Container>
      <TitleSubtitle
        title={`${t('step_step', { index: props.index })} ${props.title}`}
        subtitle={props.subtitle}
        gap="0.5rem"
      />
      <Wrapper>
        <Texts
          text={t('files_to_convert', { count: props.totalFiles })}
          color={theme.colors.cardForeground}
        />
        <BasicSettings>
          <Select
            text={props.currentFormat.toUpperCase()}
            label={t('configuration_section_format')}
            options={props.formats.map(format => ({
              text: format.toUpperCase(),
              value: format,
              selected: format === props.currentFormat,
            }))}
            onclickCallback={handleFormatClick}
            size={theme.buttonSizes?.md}
            color={theme.buttonColors.ghost}
          />
          <InputLabel
            label={t('configuration_section_quality')}
            placeholder={'90'}
            onChangeCallback={e => handleQuality(e)}
          />
        </BasicSettings>
        <AdvancedConfigs></AdvancedConfigs>
        <ButtonsWrapper>
          <Button
            size={theme.buttonSizes.md}
            color={theme.buttonColors.ghost}
            width="100%"
            onClickCallback={props.onGoBackCallback}
          >
            <IconAndText
              text={t('go_back_button')}
              size={theme.fonts.sm}
              color={theme.colors.foreground}
              icon={<IconArrow stroke="none" transform="rotate(180deg)" />}
            ></IconAndText>
          </Button>
          <Button
            size={theme.buttonSizes.md}
            color={theme.buttonColors.primary}
            width="100%"
            onClickCallback={props.onClickCallback}
          >
            <Texts
              text={t('continue_button')}
              size={theme.fonts.sm}
              color={theme.colors.primaryForeground}
            />
          </Button>
        </ButtonsWrapper>
      </Wrapper>
    </Container>
  );
}

const ConfigurationsSectionMemo = React.memo(_ConfigurationsSection);

export default function ConfigurationsSection(
  props: ConfigurationsSectionProps
) {
  return <ConfigurationsSectionMemo {...props} />;
}
