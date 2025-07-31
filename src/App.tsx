import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublishHouse from './pages/PublishHouse';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import { ProtectedRoute } from './components/molecules/ProtectedRoute';
import { CategoriesPage } from './pages/Categories';
import Locations from './pages/Locations';
import { BasicLayout } from './components/templates/BasicLayout';
import SellersPage from './pages/Sellers';
import VisitSlotsPage from './pages/VisitSlots';

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
      <Route
        path="/locations"
        element={<Locations />}
      />
      <Route
        path="/sellers"
        element={
          <ProtectedRoute role="admin">
            <SellersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/publish-house"
        element={
          <ProtectedRoute role="vendedor">
            <BasicLayout>
              <PublishHouse />
            </BasicLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/visit-slots"
        element={
          <ProtectedRoute role="vendedor">
            <BasicLayout>
              <VisitSlotsPage />
            </BasicLayout>
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
