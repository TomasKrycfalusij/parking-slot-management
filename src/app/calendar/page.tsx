// import Days from '@/components/Days'
import React from 'react'
import { getDaysFromDatabase } from '../getDays';
import LogOut from '../../components/LogOut';
import CalendarRegistration from '@/components/CalendarRegistration';
import pageStyle from './pageStyle.module.css';

const page = async () => {
    const days = await getDaysFromDatabase();
  
  return (
    <div className={pageStyle.main}>
      {
        days?.map((day) => {
          return (
            <div key={day.id}>
              <h2>{day.date.toString()}</h2>
              <div>{day.bookings.map((reservation) => {
                return (
                  <p key={reservation}>{reservation}</p>
                )
              })}
              </div>
            </div>
          )
        
        })
      }
      <CalendarRegistration days={days}/>
      <LogOut />
    </div>
  )
}

export default page
