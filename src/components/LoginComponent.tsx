"use client";
import React, { useState } from 'react';
import { useUser } from './UserContext';
import loginStyles from './loginComponentStyles.module.css';

const LoginComponent = () => {
  const names: string[] = [
    'Arnoštová Eva',
    'Bělohradský Vladimír',
    'Bryknar Tomáš',
    'Dědek Martin',
    'Hess Marcel',
    'Hloupý Ondřej',
    'Holcová Pavlína',
    'Holec Tomáš',
    'Jasso Miroslav',
    'Kačmár Vítězslav',
    'Košek Michal',
    'Kosina Jan',
    'Kotas Oldřich',
    'Kulhánek Tomáš',
    'Kvapil Josef',
    'Lád Tomáš',
    'Matoušek Martin',
    'Netrhová Štěpánka',
    'Novák Jakub',
    'Obrátil Jan',
    'Pecina David',
    'Plašek Anna',
    'Pohořalý Daniel',
    'Samek Pavel',
    'Šidák František',
    'Solnař Petr',
    'Spurný Stanislav',
    'Tvrdík Martin',
    'Vašák Petr',
    'Vykoukal Aleš',
    'Vyskoč Ondřej'
  ];

  const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
  const [selectedUserByInput, setSelectedUserByInput] = useState<string>(sortedNames[0]);
  const { loggedUser, loginUser } = useUser();

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserByInput(event.target.value);
    console.log(event.target.value);
  };

  const handleLogin = () => {
    console.log("logging in");
    loginUser(selectedUserByInput);
  };

  return (
    <div className={loginStyles.inputContainer}>
      <p className={loginStyles.loginDescription}>Vyberte uživatele:</p>
      <select value={selectedUserByInput} onChange={handleUserChange}>
        {sortedNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button className={`${loginStyles.loginButton} btn`} type="submit" onClick={handleLogin}>
        Přihlásit se
      </button>
    </div>
  );
};

export default LoginComponent;
