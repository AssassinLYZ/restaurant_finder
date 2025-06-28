import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from 'src/shared/store/user/userSlice';
import { ACCESSTOKEN, USER } from 'src/shared/constant/user';
import { DrawerComponent } from 'src/shared/components/drawer';

import { StyledInput, StyledButton, FormWrapper, ButtonWrapper } from './styled';

export const LoginButton: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(login(USER));
      setIsDrawerOpen(false);
      localStorage.setItem('accessToken', ACCESSTOKEN);
      setError('');
    } catch {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <>
      <ButtonWrapper data-testid='header-login' onClick={() => setIsDrawerOpen(true)}>
        <span>Login</span>
      </ButtonWrapper>

      <DrawerComponent isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <FormWrapper onSubmit={handleSubmit}>
          <StyledInput
            value={USER.email}
            disabled
            label="Email:"
            onChange={() => {}}
            placeholder="Enter email"
          />

          <StyledInput
            value={USER.password}
            type="password"
            disabled
            label="Password:"
            onChange={() => {}}
            placeholder="Enter password"
          />
          <StyledButton type="submit">Login with default value</StyledButton>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </FormWrapper>
      </DrawerComponent>
    </>
  );
};
