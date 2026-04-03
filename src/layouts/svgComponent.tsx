'use client';

import BaseLayout from '@/layouts/base';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 3rem 1.5rem;
  margin: 0 auto;
  width: 100%;
  max-width: 72rem;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function _SvgComponent() {
  return (
    <Wrapper>
      
    </Wrapper>
  );
}

const SvgComponentMemo = React.memo(_SvgComponent);

export default function SvgComponent() {
  return (
    <BaseLayout>
      <SvgComponentMemo />
    </BaseLayout>
  );
}
