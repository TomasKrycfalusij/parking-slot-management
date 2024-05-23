"use client"
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Nullable } from 'primereact/ts-helpers';

const CalendarRegistration = () => {
  const [selectedDate, setSelectedDate] = useState<Nullable<Date>>(null);
  const [viewDate, setViewDate] = useState<Date | undefined>(new Date());

  const handleDateChange = (e: { value: Nullable<Date> }) => {
    setSelectedDate(e.value);
  };

  const handleLogDate = () => {
    console.log('Selected Date:', selectedDate);
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleViewDateChange = (e: { value: Date }) => {
    const newViewDate = e.value;
    if (newViewDate >= today && newViewDate <= maxDate) {
      setViewDate(newViewDate);
    }
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
        dateTemplate={(date) => (
          <div>
            <span>{date.day}</span>
            <div>1</div>
          </div>
        )}
      />
      <p>Zvolené datum: {selectedDate ? selectedDate.toLocaleDateString() : "No date selected"}</p>
      <button type="button" onClick={handleLogDate}>
        Log Selected Date
      </button>
    </div>
  );
};

export default CalendarRegistration;
