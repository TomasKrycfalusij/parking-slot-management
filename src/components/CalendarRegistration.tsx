"use client"
import { DayType } from '../types/types';
import React, { useState } from 'react';
import { Calendar, CalendarDateTemplateEvent } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Nullable } from 'primereact/ts-helpers';
import { addPersonToDay, addPersonToNewDay } from '@/app/getDays';

interface CalendarRegistrationProps {
  days?: DayType[];
}

const CalendarRegistration: React.FC<CalendarRegistrationProps> = ({ days }) => {
  const [selectedDate, setSelectedDate] = useState<Nullable<Date>>(null);
  const [viewDate, setViewDate] = useState<Date | undefined>(new Date());

  const handleDateChange = (e: { value: Nullable<Date> }) => {
    setSelectedDate(e.value);
  
    if (e.value) {
      const selectedDateString = e.value.toLocaleDateString('cs-CZ');
  
      const matchedDay = days?.find(singleDay => new Date(singleDay.date).toLocaleDateString('cs-CZ') === selectedDateString);
  
      if (matchedDay) {
        if (matchedDay.bookings.length < matchedDay.capacity) {
          addPersonToDay(matchedDay._id, "User");
          console.log("empty");
        } else {
          // show error message
          console.log("full");
        }
      } else {
        addPersonToNewDay(e.value, 3);
      }
    }
  };
  

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleViewDateChange = (e: { value: Date }) => {
    const newViewDate = e.value;
    if (newViewDate.getMonth() >= today.getMonth() && newViewDate.getMonth() <= maxDate.getMonth()) {
      setViewDate(newViewDate);
    }
  };

  const createComparableDate = (day: number, month: number, year: number) => {
    return new Date(year, month, day).toLocaleDateString('cs-CZ');
  };

  const matchDate = (date: CalendarDateTemplateEvent, days: DayType[] | undefined) => {
    const dateString = createComparableDate(date.day, date.month, date.year);
    return days?.find(singleDay => new Date(singleDay.date).toLocaleDateString('cs-CZ') === dateString);
  };

  return (
    <div>
      <p>Calendar</p>

      <Calendar 
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
          return (
            <div>
              <span>{date.day}</span>
              <p>
                {matchedDay ? `${matchedDay.bookings.length} / ${matchedDay.capacity}` : ''}
              </p>
            </div>
          );
        }}
      />
      <p>Zvolené datum: {selectedDate ? selectedDate.toLocaleDateString('cs-CZ') : "No date selected"}</p>
      <div>
        {days?.map(day => (
          <div key={String(day._id)}>
            <p>{new Date(day.date).toLocaleDateString('cs-CZ')}</p>
            <p>Capacity: {day.bookings.length} / {day.capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarRegistration;
