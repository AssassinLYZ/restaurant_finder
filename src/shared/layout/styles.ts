import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
`;

export const Main = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;
