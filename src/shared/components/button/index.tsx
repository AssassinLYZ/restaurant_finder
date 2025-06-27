import React, { ButtonHTMLAttributes } from 'react';

import { StyledButton } from './styled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...rest }:ButtonProps) {
  return <StyledButton {...rest}>{children}</StyledButton>;
};
