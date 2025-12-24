'use client';

import Button from '@/components/atoms/Button';
import IconSettings from '@/components/atoms/icons/IconSettings';
import Texts from '@/components/atoms/Texts';
import Wrapper from '@/components/atoms/Wrapper';
import IconAndText from '@/components/molecules/IconAndText';
import InputLabel from '@/components/molecules/InputLabel';
import Select from '@/components/molecules/Select';
import { ImageFormats } from '@/lib/enums/imgFormats';
import { useTranslations } from 'next-intl';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const SizeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;
interface ConfigurationsSectionProps {
  formats: ImageFormats[];
  currentFormat: ImageFormats;
  isGenerateComponentAvailable: boolean;
  onclickFormatCallback: (format: ImageFormats) => void;
  onClickCallback: React.MouseEventHandler<HTMLButtonElement>;
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
    <Wrapper>
      <IconAndText
        text={t('configuration_section_title')}
        color={theme.colors.cardForeground}
        icon={<IconSettings size={theme.icons.sm} color={theme.colors.cardForeground} />}
        gap=".5rem"
      />
      <Select
        text={props.currentFormat.toUpperCase()}
        options={props.formats.map(format => ({
          text: format.toUpperCase(),
          value: format,
          selected: format === props.currentFormat,
        }))}
        onclickCallback={handleFormatClick}
        children={undefined}
        size={theme.buttonSizes?.md}
        color={theme.buttonColors.ghost}
      />
      <SizeWrapper>
        <InputLabel
          label={t('configuration_section_width')}
          placeholder={'800'}
          onChangeCallback={props.onChangeWidthCallback}
        />
        <InputLabel
          label={t('configuration_section_height')}
          placeholder={'600'}
          onChangeCallback={props.onChangeHeightCallback}
        />
      </SizeWrapper>
      <InputLabel
        label={t('configuration_section_quality')}
        placeholder={'100'}
        onChangeCallback={e => handleQuality(e)}
      />
      <Button
        size={theme.buttonSizes.md}
        color={theme.buttonColors.primary}
        disabled={props.isGenerateComponentAvailable}
        onClickCallback={props.onClickCallback}
      >
        <Texts text={t('configuration_section_button')} size={theme.fonts.sm} color={theme.colors.foreground} />
      </Button>
    </Wrapper>
  );
}

const ConfigurationsSectionMemo = React.memo(_ConfigurationsSection);

export default function ConfigurationsSection(props: ConfigurationsSectionProps) {
  return <ConfigurationsSectionMemo {...props} />;
}
