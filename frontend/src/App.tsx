import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicRoute } from './components/auth/PublicRoute';
import { Dashboard } from './pages/dashboard/Dashboard';
import { SurveysListPage } from './pages/surveys/SurveysListPage';
import TemplatesPage from './pages/templates/TemplatesPage';
import { AuthProvider } from './contexts/AuthProvider';
import SurveyBuilder from './pages/surveys/SurveyBuilder';
import SurveyEditPage from './pages/surveys/SurveyEditPage';
import SurveyPreviewPage from './pages/surveys/SurveyPreviewPage';
import PublicFormPage from './pages/surveys/PublicFormPage';
import FormResponsesPage from './pages/surveys/FormResponsesPage';
import LandingPage from './pages/home/Landing';
import NotFoundPage from './pages/NotFound';
import SurveyError from './pages/SurveyError';
import { Toaster } from '@/components/ui/toaster';
import TermsOfService from './pages/internal/TermsOfService';
import PrivacyPolicy from './pages/internal/PrivacyPolicy';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes without layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route
            path="/terms-of-service"
            element={
              <PublicRoute>
                <TermsOfService />
              </PublicRoute>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <PublicRoute>
                <PrivacyPolicy />
              </PublicRoute>
            }
          />
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
          <Route path="/show/:formId" element={<PublicFormPage />} />

          <Route path="/not-found" element={<NotFoundPage />} />

          <Route path="/survey-error" element={<SurveyError />} />

          {/* Protected routes with layout */}
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-surveys"
              element={
                <ProtectedRoute>
                  <SurveysListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/surveys/create"
              element={
                <ProtectedRoute>
                  <SurveyBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/surveys/:id/edit"
              element={
                <ProtectedRoute>
                  <SurveyEditPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/surveys/:id/responses"
              element={
                <ProtectedRoute>
                  <FormResponsesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/surveys/:id/preview"
              element={
                <ProtectedRoute>
                  <SurveyPreviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/templates"
              element={
                <ProtectedRoute>
                  <TemplatesPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}
