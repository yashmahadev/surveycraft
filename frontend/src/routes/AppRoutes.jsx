import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import FormBuilder from '../pages/FormBuilder';
import MyForms from '../pages/MyForms';
import EditForm from '../pages/EditForm';
import FormPreview from '../pages/FormPreview';
import PublicForm from '../pages/PublicForm';
import PublicLayout from '../components/PublicLayout';
import ViewResponses from '../pages/ViewResponses';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import Landing from '../pages/home/Landing';

const AppRoutes = () => {
  const { isLoading } = useApp();

  return (
    <AuthProvider>
      {isLoading && <LoadingSpinner />}
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/show/:formId"
            element={
              <PublicLayout>
                <PublicForm />
              </PublicLayout>
            }
          />

          {/* Protected Routes */}
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/form-builder" element={<FormBuilder />} />
            <Route path="/my-forms" element={<MyForms />} />
            <Route path="/form-builder/edit/:formId" element={<EditForm />} />
            <Route path="/forms/preview/:formId" element={<FormPreview />} />
            <Route path="/forms/:formId/responses" element={<ViewResponses />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default AppRoutes;
