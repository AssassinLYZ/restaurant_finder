import React, { ReactNode } from 'react';

import Header from './header';
import { Container, Main } from './styles';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
};
export default Layout;
