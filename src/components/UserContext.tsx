"use client"
import React, { PropsWithChildren, createContext, use, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserContextType {
  loggedUser: string;
  loginUser: (user: string) => void;
  logOutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState<string>('');
  const router = useRouter();

  const loginUser = (user: string) => {
    setLoggedUser(user);
    localStorage.setItem('selectedUser', user);
    router.push('/calendar');
  }

  const logOutUser = () => {
    localStorage.removeItem('selectedUser');
    router.push('/');
}

  useEffect(() => {
    const storedUser = localStorage.getItem('selectedUser');
    if (storedUser) {
      setLoggedUser(storedUser);
      router.push('/calendar');
    }
  }, []);

  return (
    <UserContext.Provider value={{ loggedUser, loginUser, logOutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
