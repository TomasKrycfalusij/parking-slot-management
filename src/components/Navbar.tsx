"use client"
import React from 'react';
import navbarStyles from './navbarStyles.module.css';
import { useUser } from './UserContext';

const Navbar = () => {
    const { logOutUser } = useUser();
  return (
    <div className={navbarStyles.navContainer}>
      <p>BATMAN</p>
      <ul className={navbarStyles.horizontalList}>
        <li><a href="/calendar">Kalendář</a></li>
        <li><a href="/registrations">Registrace</a></li>
        <li><a onClick={() => logOutUser()}>Odhlásit se</a></li>
      </ul>
    </div>
  );
};

export default Navbar;
