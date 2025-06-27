import styled from 'styled-components';

export const ErrorContainer = styled.div`
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
  border: 1px solid ${(props) => props.theme.colors.error};
`;

export const ErrorTitle = styled.h3`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.typography.h3.size};
  margin: 0;
`;

export const ErrorDescription = styled.p`
  color: ${(props) => props.theme.colors.dark};
  font-size: ${(props) => props.theme.typography.body.size};
  max-width: 600px;
`;

export const ErrorDetails = styled.details`
  color: ${(props) => props.theme.colors.gray};
  font-size: ${(props) => props.theme.typography.caption.size};
  width: 100%;
  max-width: 800px;
  margin-top: ${(props) => props.theme.spacing.md};

  & summary {
    cursor: pointer;
    outline: none;
    margin-bottom: ${(props) => props.theme.spacing.sm};
  }

  & pre {
    white-space: pre-wrap;
    background-color: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.spacing.md};
    border-radius: ${(props) => props.theme.borderRadius.sm};
    overflow-x: auto;
  }
`;
