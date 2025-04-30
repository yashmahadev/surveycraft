// src/contexts/AuthProvider.tsx
import { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { authService } from '../services/authService';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount and when token changes
  useEffect(() => {
    const checkAuth = () => {
      const token = authService.getToken();
      setIsAuthenticated(!!token);
    };

    // Check immediately
    checkAuth();

    // Set up an interval to check periodically
    const interval = setInterval(checkAuth, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
