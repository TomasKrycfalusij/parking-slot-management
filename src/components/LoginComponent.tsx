"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const names: string[] = ["Tomáš", "Tomáš K.", "Máca"];
  const [selectedUser, setSelectedUser] = useState<string>(names[0]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('selectedUser');
    if (storedUser) {
      setSelectedUser(storedUser);
      router.push('/calendar');
    }
  }, []);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  const handleLogin = () => {
    localStorage.setItem('selectedUser', selectedUser);
    router.push('/calendar');
  };

  return (
    <div>
      <p>Uživatel</p>
      <select value={selectedUser} onChange={handleUserChange}>
        {names.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button type="submit" onClick={() => handleLogin()}>Přihlásit se</button>
    </div>
  );
};

export default LoginComponent;
