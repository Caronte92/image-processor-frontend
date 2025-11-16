import Button from '@/components/atoms/Button';
import IconAndText from '@/components/molecules/IconAndText';
import { subHeaderIcon } from '@/lib/services/utils/subHeader';
import { useTranslations } from 'next-intl';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const Container = styled.div`
    width: 100%;
    background-color: ${props => props.theme.colors?.muted};
    border-block: 1px solid ${props => props.theme.colors?.border};
`;

const SubMenuWrapper = styled.div`
    display: flex;
    padding: 0 1rem;
    margin: 0 auto;
    gap: 0.5rem;
    max-width: 99rem;
`;

interface SubMenuProps {
    items: string[];
    selected: string;
    // eslint-disable-next-line no-unused-vars
    onClickCallback: (item: string) => void;
}

function _SubMenu({ items, selected, onClickCallback }: SubMenuProps) {
    const t = useTranslations('SubMenu');
    const theme = useTheme();

    return (
        <Container>
            <SubMenuWrapper>
                {items.map((item, index) => (
                    <Button
                        key={`option_${index + 1}`}
                        color={theme.buttonColors.ghost}
                        size={theme.buttonSizes.md}
                        selected={selected === item}
                        hideBorder={true}
                        onClickCallback={() => onClickCallback(item)}
                        data-item={item}
                    >
                        <IconAndText
                            icon={subHeaderIcon(index, theme.icons.xs)}
                            text={t(`option_${index + 1}`)}
                            size={theme.fonts.sm}
                            color={theme.colors.foreground}
                            fontWeight={theme.weights.medium}
                        />
                    </Button>
                ))}
            </SubMenuWrapper>
        </Container>
    );
}

const SubMenuMemo = React.memo(_SubMenu);

export default function SubMenu(props: SubMenuProps) {
    return <SubMenuMemo {...props} />;
}
