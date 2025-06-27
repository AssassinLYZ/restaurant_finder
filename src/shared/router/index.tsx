import { useSelector } from 'react-redux';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { RootState } from 'src/shared/store/store';

import Layout from '../layout';

const Restaurant = lazy(() => import('src/pages/restaurant'));
const ErrorPage = lazy(() => import('src/pages/errorPage'));
const ScrollToTop = lazy(() => import('src/shared/components/scrollTop'));
const Main = lazy(() => import('src/pages/main'));
const Collection = lazy(() => import('src/pages/collection'));
const LoadingScreen = lazy(() => import('src/shared/components/loading/index'));

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/main" state={{ from: location }} replace />;
  }
  return children;
};

export const ApplicationRoutes: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingScreen fullScreen />}>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<Main />} />

          <Route
            path="/collection"
            element={
              <ProtectedRoute>
                <Collection />
              </ProtectedRoute>
            }
          />

          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </Suspense>
  </BrowserRouter>
);
