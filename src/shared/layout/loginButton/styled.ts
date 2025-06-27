import styled from 'styled-components';

import Input from 'src/shared/components/input';
import { Button } from 'src/shared/components/button';

export const StyledButton = styled(Button)`
  align-self: center;
  margin-top: ${(props) => props.theme.spacing.xxl};
`;

export const StyledInput = styled(Input)`
  margin-top: ${(props) => props.theme.spacing.xl};
  position: relative;
  right: 0;
`;
export const FormWrapper = styled.form`
  margin-top: ${(props) => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
`;
export const ButtonWrapper = styled.button`
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.pill};
  font-size: ${(props) => props.theme.typography.caption.size};
  font-weight: ${(props) => props.theme.typography.h3.weight};

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
  }
`;
