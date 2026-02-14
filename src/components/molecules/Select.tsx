'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import IconChevronDown from '@/components/atoms/icons/IconChevronDown';
import styled, { useTheme } from 'styled-components';
import Texts from '@/components/atoms/Texts';
import { IOptionsSelect } from '@/lib/types/IOptions';
import { ButtonColorState, ButtonSize } from '@/theme';

const getBorder = (
  enabled: boolean,
  enabledBorder: string,
  disabledBorder: string
) => {
  let borderBase = '0.0625em solid';
  if (enabled)
    return enabledBorder !== ''
      ? `${borderBase} ${enabledBorder}`
      : 'transparent';
  return disabledBorder !== ''
    ? `${borderBase} ${disabledBorder}`
    : 'transparent';
};

const SelectWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
`;

const SelectContainer = styled.div`
  position: relative;
`;

const ButtonSelect = styled.button<{
  $color: ButtonColorState;
  $size: ButtonSize;
  $enabled: boolean;
  $selected?: boolean;
  $hideBorder: boolean;
}>`
  width: 100%;
  padding: ${props => props.$size.padding};
  color: ${props =>
    props.$enabled
      ? props.$selected
        ? props.$color.selected
        : props.$color.default.content
      : props.$color.disabled.content};
  background-color: ${props =>
    props.$enabled
      ? props.$selected
        ? props.$color.selected
        : props.$color.default.background
      : props.$color.disabled.background};
  cursor: ${props => (props.$enabled ? 'pointer' : 'not-allowed')};
  border: ${({ $enabled, $color, $hideBorder }) =>
    $hideBorder
      ? 'transparent'
      : getBorder($enabled, $color.default.border, $color.disabled.border)};
  border-radius: 0.25em;
  opacity: ${props => (props.$enabled ? 'unset' : '0.4')};
  gap: 0.5em;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props =>
      props.$enabled
        ? props.$color.hover.content
        : props.$color.disabled.content};
    background-color: ${props =>
      props.$enabled
        ? props.$color.hover.background
        : props.$color.disabled.background};
    border: ${({ $enabled, $color, $hideBorder }) =>
      $hideBorder
        ? 'transparent'
        : getBorder($enabled, $color.default.border, $color.disabled.border)};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const DropdownContainer = styled.div`
  background-color: ${props =>
    props.theme.colors?.background || props.theme.background};
  border: 1px solid ${props => props.theme.colors?.border};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-top: 0.25rem;
  gap: 0.5rem;
  overflow: hidden;
`;

const OptionContainer = styled.div<{ $highlighted?: boolean }>`
  color: ${({ theme }) => theme.colors.foreground};
  background: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.accent : 'transparent'};
  border: transparent;
  padding: 0.5rem 0.75rem;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface SelectProps {
  text: string;
  label?: string;
  icon?: React.ReactNode;
  options: IOptionsSelect[];
  onclickCallback: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
  size: ButtonSize;
  color: ButtonColorState;
  disabled?: boolean;
  selected?: boolean;
  hideBorder?: boolean;
}

function _Select({ hideBorder = false, ...props }: SelectProps) {
  const theme = useTheme();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
        setHighlightedIndex(-1);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible]);

  const _handleOnclick = () => {
    if (props.disabled) return;
    setIsDropdownVisible(prev => !prev);
    setHighlightedIndex(-1);
  };

  const handleOptionClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      props.onclickCallback(event);
      setIsDropdownVisible(false);
      setHighlightedIndex(-1);
    },
    [props.onclickCallback]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isDropdownVisible) {
        if (
          event.key === 'Enter' ||
          event.key === ' ' ||
          event.key === 'ArrowDown'
        ) {
          event.preventDefault();
          setIsDropdownVisible(true);
          setHighlightedIndex(0);
        }
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev =>
            prev < props.options.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev =>
            prev > 0 ? prev - 1 : props.options.length - 1
          );
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (
            highlightedIndex >= 0 &&
            highlightedIndex < props.options.length
          ) {
            const option = props.options[highlightedIndex];
            const syntheticEvent = {
              currentTarget: { dataset: { value: option.value } },
            } as unknown as React.MouseEvent<HTMLElement>;
            props.onclickCallback(syntheticEvent);
            setIsDropdownVisible(false);
            setHighlightedIndex(-1);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsDropdownVisible(false);
          setHighlightedIndex(-1);
          break;
        case 'Tab':
          setIsDropdownVisible(false);
          setHighlightedIndex(-1);
          break;
      }
    },
    [isDropdownVisible, highlightedIndex, props.options, props.onclickCallback]
  );

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  const selectedIndex = props.options.findIndex(o => o.selected);

  return (
    <SelectWrapper>
      {props.label && (
        <Texts text={props.label} color={theme.colors.foreground} />
      )}
      <SelectContainer ref={containerRef}>
        <ButtonSelect
          $color={props.color}
          $size={props.size}
          $enabled={!props.disabled}
          $selected={props.selected}
          $hideBorder={hideBorder}
          onClick={_handleOnclick}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isDropdownVisible}
          aria-haspopup="listbox"
          aria-activedescendant={
            highlightedIndex >= 0
              ? `select-option-${highlightedIndex}`
              : undefined
          }
          type="button"
        >
          <Container>
            {props.icon && props.icon}
            <Texts
              type={'p'}
              text={props.text}
              size={theme.fonts?.sm}
              fontWeight={theme.weights?.bold}
              color={theme.colors?.foreground}
            />
            <IconChevronDown size={theme.icons.xs} />
          </Container>
        </ButtonSelect>
        {isDropdownVisible && (
          <DropdownContainer
            role="listbox"
            aria-activedescendant={
              highlightedIndex >= 0
                ? `select-option-${highlightedIndex}`
                : undefined
            }
          >
            {props.options.map((option, index) => (
              <OptionContainer
                key={option.value}
                id={`select-option-${index}`}
                ref={el => {
                  optionRefs.current[index] = el;
                }}
                data-value={option.value}
                onClick={handleOptionClick}
                $highlighted={index === highlightedIndex}
                role="option"
                aria-selected={index === selectedIndex}
              >
                <OptionWrapper>
                  <Texts
                    type={'p'}
                    text={option.text}
                    size={theme.fonts.sm}
                    fontWeight={theme.weights.regular}
                    color={theme.colors?.foreground}
                  />
                </OptionWrapper>
              </OptionContainer>
            ))}
          </DropdownContainer>
        )}
      </SelectContainer>
    </SelectWrapper>
  );
}

const SelectMemo = React.memo(_Select);

export default function Select(props: SelectProps) {
  return <SelectMemo {...props} />;
}
