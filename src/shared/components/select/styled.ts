import styled from 'styled-components';

export const SelectWrapper = styled.div<{
  $variant?: 'default' | 'filled';
}>`
  position: relative;
  align-items: center;
`;

export const Label = styled.span`
  margin-right: ${({ theme }) => theme.spacing.sm};
  display: block;
  color: ${({ theme }) => theme.colors.dark};
  flex-shrink: 0;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.caption.size};
  font-weight: ${({ theme }) => theme.typography.h1.weight};
`;

export const SelectNative = styled.select<{
  $variant?: 'default' | 'filled';
}>`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background-color: ${({ theme, $variant }) =>
    $variant === 'filled' ? theme.colors.light : theme.colors.background};
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.typography.caption.size};
  appearance: none;
  cursor: pointer;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  line-height: 1.5rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.light};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

export const SelectIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 0.75rem;
  color: #6b7280;
  transition: transform 0.2s;
  &::before {
    content: ' ▽ ';
  }
`;
