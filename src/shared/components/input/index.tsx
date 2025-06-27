import React, { forwardRef } from 'react';

import { InputContainer, Label, InputWrapper, Adornment, StyledInput, ErrorText } from './styled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: 'default' | 'filled';
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, startAdornment, endAdornment, variant = 'default', className, ...props },
    ref
  ) => {
    return (
      <InputContainer className={className}>
        {label && <Label>{label}</Label>}
        <InputWrapper $hasError={!!error} $variant={variant}>
          {startAdornment && <Adornment>{startAdornment}</Adornment>}
          <StyledInput ref={ref} {...props} />
          {endAdornment && <Adornment>{endAdornment}</Adornment>}
        </InputWrapper>
        {error && <ErrorText>{error}</ErrorText>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;
