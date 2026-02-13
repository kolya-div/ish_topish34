
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { dbService } from '../services/dbService';

interface UserContextType {
  user: User | null;
  login: (name: string, telegram: string) => Promise<void>;
  logout: () => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('architect_user_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (name: string, telegram: string) => {
    // DB-ga yozish yoki olish
    const dbUser = await dbService.insertUser(name, telegram);
    setUser(dbUser);
    localStorage.setItem('architect_user_session', JSON.stringify(dbUser));
    setLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('architect_user_session');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoginModalOpen, setLoginModalOpen }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
