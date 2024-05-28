"use client"
import React, { useState } from 'react';
import navbarStyles from './navbarStyles.module.css';
import { useUser } from './UserContext';

const Navbar = () => {
    const { logOutUser } = useUser();
    const [navVisible, setNavVisible] = useState(false);

    const toggleNav = () => {
      setNavVisible(prev => !prev);
    }

    return (
      <>
        <div className={navbarStyles.navContainer}>
            <p>BATMAN</p>
                <button onClick={() => toggleNav()} className={navbarStyles.navButton}>MENU</button>
                <ul className={`${navbarStyles.horizontalList} ${navVisible ? navbarStyles.navActive : ''} ${navbarStyles.navUlPc}`}>
                    <li><a href="/calendar">Kalendář</a></li>
                    <li><a href="/registrations">Registrace</a></li>
                    <li><a onClick={() => logOutUser()}>Odhlásit se</a></li>
                </ul>
        </div>
        <ul className={`${navbarStyles.horizontalList} ${navVisible ? navbarStyles.navActive : ''} ${navbarStyles.navUlPhone}`}>
          <li><a href="/calendar">Kalendář</a></li>
          <li><a href="/registrations">Registrace</a></li>
          <li><a onClick={() => logOutUser()}>Odhlásit se</a></li>
        </ul>
    </>
    );
};

export default Navbar;
