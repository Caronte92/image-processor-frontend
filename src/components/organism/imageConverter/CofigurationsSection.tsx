import Button from '@/components/atoms/Button';
import IconSettings from '@/components/atoms/icons/IconSettings';
import Texts from '@/components/atoms/Texts';
import Wrapper from '@/components/atoms/Wrapper';
import IconAndText from '@/components/molecules/IconAndText';
import Select from '@/components/molecules/Select';
import { ImageFormats } from '@/lib/enums/imgFormats';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useTheme } from 'styled-components';

interface ConfigurationsSectionProps {
    formats: ImageFormats[];
    currentFormat: ImageFormats;
    isGenerateComponentAvailable: boolean;
    // eslint-disable-next-line no-unused-vars
    onclickFormatCallback: (format: ImageFormats) => void;
    onClickCallback: React.MouseEventHandler<HTMLButtonElement>;
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
            ></Select>
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
