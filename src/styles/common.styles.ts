import { breakpoints } from './breakpoints';
import styled from 'styled-components';

export const Page = styled.div <{$orientation: 'column' | 'row'}>`
  padding: 3rem 1.5rem;
  margin: 0 auto;
  width: 100%;
  max-width: 80rem;
  align-items: center;
  display: flex;
  flex-direction: ${props => props.$orientation};
  gap: 2rem;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
  }
`;
