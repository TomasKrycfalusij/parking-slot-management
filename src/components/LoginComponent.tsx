"use client"
import React, { useState } from 'react';
import { useUser } from './UserContext';

const LoginComponent = () => {
  const names: string[] = ['Tomáš', 'Tomáš K.', 'Máca'];
  const [selectedUserByInput, setSelectedUserByInput] = useState<string>(names[0]);
  const { loggedUser, loginUser } = useUser();

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserByInput(event.target.value);
    console.log(event.target.value);
  };

  const handleLogin = () => {
    console.log("logging in")
    loginUser(selectedUserByInput);
  };

  return (
    <div>
      <p>Uživatel</p>
      <select value={selectedUserByInput} onChange={handleUserChange}>
        {names.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button type="submit" onClick={() => handleLogin()}>
        Přihlásit se
      </button>
    </div>
  );
};

export default LoginComponent;
