"use client"
import React from 'react';
import { IDay } from '../../models/day';
import { useUser } from './UserContext';

interface ShowRegistrationsProps {
  days?: IDay[];
}

const ShowRegistrations: React.FC<ShowRegistrationsProps> = ({ days }) => {
  const { loggedUser } = useUser();

  const registeredDays = days?.filter(day => day.bookings.includes(loggedUser));

  return (
    <div>
      <h2>Your Registrations</h2>
      {registeredDays && registeredDays.length > 0 ? (
        <ul>
          {registeredDays.map((day) => (
            <li key={String(day._id)}>
              {new Date(day.date).toLocaleDateString('cs-CZ')}
            </li>
          ))}
        </ul>
      ) : (
        <p>No registrations found.</p>
      )}
    </div>
  );
};

export default ShowRegistrations;
