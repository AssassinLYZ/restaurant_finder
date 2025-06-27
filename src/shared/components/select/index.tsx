import React, { forwardRef } from 'react';

import { Label, SelectIcon, SelectNative, SelectWrapper } from './styled';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  className?: string;
  label?: string;
  variant?: 'default' | 'filled';
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { options, value, onChange, placeholder, label, disabled, className, variant = 'default' },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={className}>
        {label && <Label>{label}</Label>}
        <SelectWrapper $variant={variant}>
          <SelectNative
            ref={ref}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            $variant={variant}
            aria-label={label || placeholder}
            id={label}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </SelectNative>
          <SelectIcon />
        </SelectWrapper>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
