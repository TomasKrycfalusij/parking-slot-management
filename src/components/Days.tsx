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
          <p>Capacity: {day.capacity}</p>
          <p>Bookings: {day.bookings.length}</p>
        </div>
      ))}
    </div>
  );
};

export default Days;
