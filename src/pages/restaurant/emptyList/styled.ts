import styled from 'styled-components';

export const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.xl};
  text-align: center;
  background-color: ${(props) => props.theme.colors.light};
  border-radius: ${(props) => props.theme.borderRadius.md};
  margin: ${(props) => props.theme.spacing.lg} 0;
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.colors.dark};
  font-size: ${(props) => props.theme.typography.h3.size};
  margin: 0;
`;

export const Description = styled.p`
  color: ${(props) => props.theme.colors.gray};
  font-size: ${(props) => props.theme.typography.body.size};
  max-width: 500px;
`;
