import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route, Navigate, RouteProps } from 'react-router-dom';
import '@/utils/axiosInterceptor';
import "antd/dist/reset.css";
import './App.css'


import { Accueil } from '@/pages/Accueil'
import { Login } from '@/pages/auth/Login'
import { APP_ROUTES } from '@/utils/constant';
import useTabhubContext, { AuthProvider } from "@/lib/context/TabhubContext";
import ProtectedRoute, { ProtectedRouteProps } from '@/utils/ProtectedRoute';
import { TabHubLayout } from './components/layout/TabhubLayout';

function Router() {
  const { tokens } = useTabhubContext();
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: !!tokens,
    authenticationPath: APP_ROUTES.LOG_IN,
  };

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<TabHubLayout />} />} >
        <Route index element={<Accueil />} />
      </Route>


      <Route
        //exact
        path={APP_ROUTES.LOG_IN}
        element={<Login />}
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
