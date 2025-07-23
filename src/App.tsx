import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import { ProtectedRoute } from './components/molecules/ProtectedRoute';
import { CategoriesPage } from './pages/Categories';
import { BasicLayout } from './components/templates/BasicLayout';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BasicLayout>
              <HomePage />
            </BasicLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <BasicLayout>
              <CategoriesPage />
            </BasicLayout>
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
