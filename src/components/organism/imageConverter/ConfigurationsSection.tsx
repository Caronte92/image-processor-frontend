'use client';

import CheckboxAndLabel from '@/components/molecules/CheckboxAndLabel';
import Texts from '@/components/atoms/Texts';
import Wrapper from '@/components/atoms/Wrapper';
import InputLabel from '@/components/molecules/InputLabel';
import Select from '@/components/molecules/Select';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import { ImageFormats } from '@/lib/enums/imgFormats';
import { useTranslations } from 'next-intl';
import React from 'react';
import styled from 'styled-components';
import Button from '@/components/atoms/Button';
import { colorVar } from '@/styles/colorVars';
import { fonts } from '@/styles/fonts';
import { buttonSizes, buttonStyles } from '@/styles/buttons';

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
  flex-direction: column;

  > * {
    flex: 1 1 50%;
  }
`;

const AdvancedConfigs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-top: 1px solid ${colorVar.border};
`;

const AdvancedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
`;

const DimensionRow = styled.div`
  display: flex;
  gap: 1rem;

  > * {
    flex: 1;
    min-width: 0;
  }
`;

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
  keepAspectRatio: boolean;
  onKeepAspectRatioCallback: (value: boolean) => void;
}

function _ConfigurationsSection({ ...props }: ConfigurationsSectionProps) {
  const t = useTranslations('ImageConverter');

  const handleKeepRatio = () => {
    props.onKeepAspectRatioCallback(!props.keepAspectRatio);
  };

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
            size={buttonSizes.md}
            color={buttonStyles.ghost}
          />
          <InputLabel
            label={t('configuration_section_quality')}
            placeholder={'90'}
            onChangeCallback={e => handleQuality(e)}
          />
        </BasicSettings>
        <AdvancedConfigs>
          <Texts
            text={t('configuration_section_advanced_title')}
            color={colorVar.cardForeground}
          />
        </AdvancedConfigs>
        <AdvancedContent>
          <DimensionRow>
            <InputLabel
              label={t('configuration_section_width')}
              placeholder={'auto'}
              onChangeCallback={props.onChangeWidthCallback}
              disabled={props.keepAspectRatio}
            />
            <InputLabel
              label={t('configuration_section_height')}
              placeholder={'auto'}
              onChangeCallback={props.onChangeHeightCallback}
              disabled={props.keepAspectRatio}
            />
          </DimensionRow>
          <CheckboxAndLabel
            label={t('configuration_section_keep_ratio')}
            checked={props.keepAspectRatio}
            onChange={handleKeepRatio}
          />
        </AdvancedContent>
        <Button
          size={buttonSizes.md}
          color={buttonStyles.primary}
          width="100%"
          disabled={props.totalFiles === 0}
          onClickCallback={props.onClickCallback}
        >
          <Texts
            text={t('continue_button')}
            size={{
              fontSize: fonts.size.sm,
              lineHeight: fonts.lineHeight.sm,
            }}
            color={colorVar.primaryForeground}
          />
        </Button>
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
