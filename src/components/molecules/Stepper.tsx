import IconArrow from '@/components/atoms/icons/IconArrow';
import Texts from '@/components/atoms/Texts';
import { IStep } from '@/lib/types/IStepper';
import React from 'react';
import styled from 'styled-components';
import { colorVar } from '@/styles/colorVars';
import { fonts } from '@/styles/fonts';

const StepperWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: default;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface StepperProps {
  steps: IStep[];
}

function _Stepper({ ...props }: StepperProps) {
  return (
    <StepperWrapper>
      {props.steps.map((step: IStep, index: number) => {
        return (
          <StepContainer key={`${index}-${step.title}`}>
            <Texts
              text={`${index + 1}. ${step.title}`}
              color={
                step.isActive ? colorVar.primary : 'oklch(0.551 0.0267 264.33)'
              }
              size={{
                fontSize: fonts.size.sm,
                lineHeight: fonts.lineHeight.sm,
              }}
            />
            {index < props.steps.length - 1 && <IconArrow stroke="none" />}
          </StepContainer>
        );
      })}
    </StepperWrapper>
  );
}

const StepperMemo = React.memo(_Stepper);

export default function Stepper(props: StepperProps) {
  return <StepperMemo {...props} />;
}
