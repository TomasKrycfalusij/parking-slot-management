"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";

const LogOut = () => {
    const router = useRouter();

    const handleLogOut = () => {
        localStorage.removeItem('selectedUser');
        router.push('/');
    }

  return (
    <div>
        <button type="submit" onClick={() => handleLogOut()}>Odhlásit se</button>
    </div>
  )
}

export default LogOut
