'use client';

import Button from '@/components/atoms/Button';
import CheckboxAndLabel from '@/components/molecules/CheckboxAndLabel';
import IconArrow from '@/components/atoms/icons/IconArrow';
import IconChevronDown from '@/components/atoms/icons/IconChevronDown';
import Texts from '@/components/atoms/Texts';
import Wrapper from '@/components/atoms/Wrapper';
import IconAndText from '@/components/molecules/IconAndText';
import InputLabel from '@/components/molecules/InputLabel';
import Select from '@/components/molecules/Select';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import { ImageFormats } from '@/lib/enums/imgFormats';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
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

const AdvancedConfigsContainer = styled.div<{ $open: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const AdvancedConfigs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
`;

const ChevronWrapper = styled.span<{ $open: boolean }>`
  display: flex;
  transition: transform 0.2s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

const AdvancedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const DimensionRow = styled.div`
  display: flex;
  gap: 1rem;

  > * {
    flex: 1 1 50%;
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
  const theme = useTheme();
  const [advancedOpen, setAdvancedOpen] = useState(false);

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
        <AdvancedConfigsContainer $open={advancedOpen}>
          <AdvancedConfigs onClick={() => setAdvancedOpen(prev => !prev)}>
            <Texts
              text={t('configuration_section_advanced_title')}
              color={theme.colors.cardForeground}
            />
            <ChevronWrapper $open={advancedOpen}>
              <IconChevronDown
                size={theme.icons.sm}
                stroke={theme.colors.cardForeground}
                disableFill
              />
            </ChevronWrapper>
          </AdvancedConfigs>
          {advancedOpen && (
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
          )}
        </AdvancedConfigsContainer>
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
            />
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
