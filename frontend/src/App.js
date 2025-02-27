import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useAuth } from './contexts/AuthContext';

// Layouts
import AuthLayout from './components/layouts/AuthLayout';
import MainLayout from './components/layouts/MainLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// User Pages
import DashboardPage from './pages/user/DashboardPage';
import TrainingListPage from './pages/user/TrainingListPage';
import TrainingDetailPage from './pages/user/TrainingDetailPage';
import AttendanceFormPage from './pages/user/AttendanceFormPage';
import MyAttendancePage from './pages/user/MyAttendancePage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import TrainingManagementPage from './pages/admin/TrainingManagementPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import ReportsAnalyticsPage from './pages/admin/ReportsAnalyticsPage';

// Other Pages
import NotFoundPage from './pages/NotFoundPage';

// Protected route component
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  
  // While checking authentication status, show nothing
  if (isLoading) {
    return null;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If roles are required and user doesn't have the required role
  if (requiredRoles.length > 0 && !requiredRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Otherwise, render the children
  return children;
};

function App() {
  return (
    <Box minH="100vh">
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>
        
        {/* Protected routes */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/trainings" element={<TrainingListPage />} />
          <Route path="/trainings/:id" element={<TrainingDetailPage />} />
          <Route path="/attendance" element={<MyAttendancePage />} />
          <Route path="/attendance/:id" element={<AttendanceFormPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRoles={['admin', 'esd_admin']}>
              <Navigate to="/admin/dashboard" replace />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requiredRoles={['admin', 'esd_admin']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/trainings" element={
            <ProtectedRoute requiredRoles={['admin', 'esd_admin']}>
              <TrainingManagementPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute requiredRoles={['admin', 'esd_admin']}>
              <UserManagementPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute requiredRoles={['admin', 'esd_admin']}>
              <ReportsAnalyticsPage />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
}

export default App;
