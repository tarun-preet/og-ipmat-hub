import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getUser, setUser as saveUser, clearUser } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  enter: (name: string) => boolean;
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

  const enter = (name: string): boolean => {
    if (!name || !name.trim()) return false;
    const newUser: User = { name: name.trim(), createdAt: new Date().toISOString() };
    saveUser(newUser);
    setUserState(newUser);
    return true;
  };

  const logout = () => {
    clearUser();
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, enter, logout, isAuthenticated: !!user }}>
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
