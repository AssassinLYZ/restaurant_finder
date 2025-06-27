import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

export const PaginationButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => (props.$active ? props.theme.colors.primary : 'white')};
  color: ${(props) => (props.$active ? 'white' : '#333')};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.border};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:last-of-type {
    margin-right: 1rem;
  }
`;

export const PaginationForm = styled.form`
  display: flex;
  gap: 0.5rem;
`;

export const PaginationInput = styled.input`
  width: 50px;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  text-align: center;
`;

export const PaginationInfo = styled.p`
  margin-left: 1rem;
  font-weight: ${(props) => props.theme.typography.h1.weight};
  color: ${(props) => props.theme.colors.gray};
`;
