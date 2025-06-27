import styled from 'styled-components';

import Input from 'src/shared/components/input';
import Select from 'src/shared/components/select';

// import Select from 'src/shared/components/select';

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: 4px 12px;
  font-size: small;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.light)};
  color: ${({ $active, theme }) => ($active ? theme.colors.light : theme.colors.primary)};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ResetButton = styled(FilterButton)`
  background: transparent;
  border-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.error};
`;

export const Container = styled.div`
  /* width:300px; */
`;

export const StyledSelect = styled(Select)`
  max-width: 400px;
  min-width: 200px;
  width: 27%;
`;
export const StyledInput = styled(Input)`
  width: 70%;
  min-width: 200px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const SearchSort = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* margin-bottom: ${({ theme }) => theme.spacing.md}; */
`;
