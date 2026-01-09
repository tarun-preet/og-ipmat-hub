import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getUser, setUser as saveUser, clearUser } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, name?: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUserState(savedUser);
    }
  }, []);

  const login = (email: string, password: string, name?: string): boolean => {
    // Simple localStorage-based auth (for demo purposes)
    const savedUser = getUser();
    if (savedUser && savedUser.email === email) {
      setUserState(savedUser);
      return true;
    }
    // If no user exists, create one (simulating first login)
    if (!savedUser && name) {
      const newUser: User = { name, email, createdAt: new Date().toISOString() };
      saveUser(newUser);
      setUserState(newUser);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const newUser: User = { name, email, createdAt: new Date().toISOString() };
    saveUser(newUser);
    setUserState(newUser);
    return true;
  };

  const logout = () => {
    clearUser();
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
