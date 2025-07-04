// test-utils.tsx
import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { render as rtlRender, RenderOptions } from '@testing-library/react';

import theme from '../theme';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
