"use client"
import React from 'react';
import { IDay } from '../../models/day';
import { useUser } from './UserContext';
import styles from './showRegistrationStyles.module.css';

interface ShowRegistrationsProps {
  days?: IDay[];
}

const ShowRegistrations: React.FC<ShowRegistrationsProps> = ({ days }) => {
  const { loggedUser } = useUser();
  const registeredDays = days
    ?.filter(day => day.bookings.includes(loggedUser))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleRemoveRegistration = async (dayId: string) => {
    if (loggedUser) {
      await fetch('/api/removePersonFromDay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dayId, person: loggedUser }),
      });
      window.location.reload();
    }
  };

  const handleRemoveAllRegistrations = async () => {
    if (loggedUser) {
      await fetch('/api/removeAllDaysFromPerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ person: loggedUser }),
      });
      window.location.reload(); // Refresh the page to update the list
    }
  };

  return (
    <div>
      <h1>Registrace</h1>
      {registeredDays && registeredDays.length > 0 ? (
        <div className={styles.registrationListContainer}>
          <ul className={styles.registrationList}>
            {registeredDays.map((day) => (
              <li key={String(day._id)} className={styles.registrationItem}>
                {new Date(day.date).toLocaleDateString('cs-CZ')}
                <button onClick={() => handleRemoveRegistration(String(day._id))} className={styles.removeButton}>X</button>
              </li>
            ))}
          </ul>
          <button onClick={handleRemoveAllRegistrations} className={styles.removeAllButton}>Odstranit všechny registrace</button>
        </div>
      ) : (
        <p>Žádné registrace nenalezeny.</p>
      )}
    </div>
  );
};

export default ShowRegistrations;
