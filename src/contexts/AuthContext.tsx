import React, { createContext, useContext, useEffect, useState } from 'react';
import { getStoredToken, removeStoredToken, setStoredToken } from '../lib/api';

export interface SopffiUser {
  name: string;
  email?: string;
  role: string;
}

interface AuthContextType {
  user: SopffiUser | null;
  loading: boolean;
  login: (token: string, user: SopffiUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SopffiUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    const storedUser = localStorage.getItem('sopffi_user') || sessionStorage.getItem('sopffi_user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        removeStoredToken();
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string, userData: SopffiUser) => {
    setStoredToken(token);
    localStorage.setItem('sopffi_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    removeStoredToken();
    localStorage.removeItem('sopffi_user');
    sessionStorage.removeItem('sopffi_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

