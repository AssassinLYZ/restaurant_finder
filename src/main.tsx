import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { APIProvider } from '@vis.gl/react-google-maps';

import './index.css';
import theme from './shared/theme';
import { store } from './shared/store/store';
import { ApplicationRoutes } from './shared/router';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <APIProvider apiKey={'AIzaSyAEwfi0eS7XpiUTrE7D_8eR2xfJ6FE577s'}>
          <Provider store={store}>
            <ApplicationRoutes />
          </Provider>
        </APIProvider>
      </ThemeProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
