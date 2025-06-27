import styled, { css } from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.typography.caption.size};
  font-weight: ${({ theme }) => theme.typography.h1.weight};
  color: ${({ theme }) => theme.colors.dark};
`;

export const InputWrapper = styled.div<{ $hasError: boolean; $variant: 'default' | 'filled' }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background-color: ${({ theme, $variant }) =>
    $variant === 'filled' ? theme.colors.light : 'transparent'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  ${({ theme, $hasError }) =>
    !$hasError &&
    css`
      &:hover {
        border-color: ${theme.colors.primary};
      }
    `}

  &:focus-within {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.error + '33' : theme.colors.primary + '33'};
  }
`;

export const StyledInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.typography.caption.size};
  font-weight: ${({ theme }) => theme.typography.body.weight};
  color: ${({ theme }) => theme.colors.dark};
  background-color: transparent;
  line-height: 1.5;

  &::placeholder {
    color: ${({ theme }) => theme.colors.border};
    opacity: 0.6;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.light};
    cursor: not-allowed;
  }
`;

export const Adornment = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.border};
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.typography.caption.size};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
