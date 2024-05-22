import React from 'react';
import { DayType } from '../types/types';

interface DaysProps {
  days?: DayType[];
}

const Days: React.FC<DaysProps> = ({ days }) => {
  return (
    <div>
      {days?.map((day) => (
        <div key={String(day._id)}>
           <p>{new Date(day.date).toLocaleDateString()}</p>
          <p>Capacity: {day.bookings.length} / {day.capacity}</p>
          <div>
            <p>Bookings:</p>
            <ul>
              {day.bookings.map((booking, index) => (
                <li key={index}>{booking}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Days;
