import Wrapper from '@/components/atoms/Wrapper';
import TitleSubtitle from '@/components/molecules/TitleSubtitle';
import React from 'react';
import { useTranslations } from 'next-intl';

function _SvgSection() {
    const t = useTranslations('SvgToReact');

    return (
        <Wrapper>
            <TitleSubtitle title={t('file_section_title')} subtitle={t('file_section_subtitle')} />
        </Wrapper>
    );
}

const SvgSectionMemo = React.memo(_SvgSection);

export default function SvgSection() {
    return <SvgSectionMemo />;
}
