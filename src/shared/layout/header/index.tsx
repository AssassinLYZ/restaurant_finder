import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import logo from 'src/assets/logo.png';
import { RootState } from 'src/shared/store/store';

import { LoginButton } from '../loginButton';
import { HeaderWrapper, LogoContainer, PostcodeInfo, UserButton } from './styled';

const Header: React.FC = () => {
  const selectedPostcode = useSelector((state: RootState) => state.restaurants.postcode);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <LogoContainer to={'main'}>
        <img rel="preload" src={logo} alt="logo" />
      </LogoContainer>
      {selectedPostcode && (
        <PostcodeInfo to={`/restaurant/${selectedPostcode}`}>
          {<span>Current postcode: 🏠 {selectedPostcode}</span>}
        </PostcodeInfo>
      )}

      {!isAuthenticated && <LoginButton />}

      {isAuthenticated && <UserButton onClick={() => navigate('/collection')}> 🦸 </UserButton>}
    </HeaderWrapper>
  );
};

export default Header;
