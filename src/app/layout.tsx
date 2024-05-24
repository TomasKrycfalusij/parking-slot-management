"use client"
import React from 'react';
import { UserProvider } from '../components/UserContext';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

/*
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
*/

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <html lang="cz">
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
