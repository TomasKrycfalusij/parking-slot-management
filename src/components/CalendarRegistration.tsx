"use client"
import { IDay } from '../../models/day';
import React, { useEffect, useState } from 'react';
import { Calendar, CalendarDateTemplateEvent } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Nullable } from 'primereact/ts-helpers';
import { useUser } from './UserContext';
import './calendarRegistration.css';

interface CalendarRegistrationProps {
  days?: IDay[];
}

const defaultCapacity: number = 10;

const CalendarRegistration: React.FC<CalendarRegistrationProps> = ({ days }) => {
  const [selectedDate, setSelectedDate] = useState<Nullable<Date>>(null);
  const [viewDate, setViewDate] = useState<Date | undefined>(new Date())
  const { loggedUser } = useUser();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedViewDate = localStorage.getItem('viewDate');
      if (storedViewDate) {
        setViewDate(new Date(storedViewDate));
      }
    }
  }, []);

  const handleDateChange = async (e: { value: Nullable<Date> }) => {
    setSelectedDate(e.value);
  
    if (e.value) {
      const selectedDateString = e.value.toLocaleDateString('cs-CZ');
  
      const matchedDay = days?.find(singleDay => new Date(singleDay.date).toLocaleDateString('cs-CZ') === selectedDateString);
  
      if (matchedDay) {
        const isUserRegistered = matchedDay.bookings.includes(loggedUser);

        if (isUserRegistered) {
          await fetch('/api/removePersonFromDay', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dayId: matchedDay._id, person: loggedUser }),
          });
          console.log("user removed");
        } else if (matchedDay.bookings.length < matchedDay.capacity) {
          await fetch('/api/addPersonToDay', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dayId: matchedDay._id, person: loggedUser }),
          });
          console.log("user added");
        } else {
          console.log("full");
        }
      } else {
        await fetch('/api/addPersonToNewDay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date: e.value, capacity: defaultCapacity, person: loggedUser }),
        });
      }
    }
    window.location.reload();
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleViewDateChange = (e: { value: Date }) => {
    const newViewDate = e.value;
    if (newViewDate.getMonth() >= today.getMonth() && newViewDate.getMonth() <= maxDate.getMonth()) {
      setViewDate(newViewDate);
      localStorage.setItem('viewDate', newViewDate.toString());
    }
  };

  const createComparableDate = (day: number, month: number, year: number) => {
    return new Date(year, month, day).toLocaleDateString('cs-CZ');
  };

  const matchDate = (date: CalendarDateTemplateEvent, days: IDay[] | undefined) => {
    const dateString = createComparableDate(date.day, date.month, date.year);
    return days?.find(singleDay => new Date(singleDay.date).toLocaleDateString('cs-CZ') === dateString);
  };

  return (
    <div>
      <h1>Kalendář</h1>
      <Calendar 
        className={`calendar`}
        value={selectedDate || undefined} 
        onChange={(e) => handleDateChange(e)} 
        showIcon 
        minDate={today} 
        maxDate={maxDate} 
        viewDate={viewDate}
        onViewDateChange={handleViewDateChange}
        inline
        variant="filled"
        dateTemplate={(date) => {
          const matchedDay = matchDate(date, days);
          const isUserRegistered = matchedDay?.bookings.includes(loggedUser);

          return (
            <div className={`singleDay`}>
              <span className={`dayNumber`}>{date.day}</span>
              <p className={`availableSpacesNumber`}>
                {matchedDay ? `${matchedDay.capacity - matchedDay.bookings.length}/${matchedDay.capacity}` : `${defaultCapacity}/${defaultCapacity}`}
              </p>
              {isUserRegistered && <span className={`registeredSign`}></span>}
            </div>
          );
        }}
      />
      {/* <p>Zvolené datum: {selectedDate ? selectedDate.toLocaleDateString('cs-CZ') : "žádné"}</p> */}
    </div>
  );
};

export default CalendarRegistration;
