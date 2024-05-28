// import Days from '@/components/Days'
import React from 'react'
import { getDaysFromDatabase } from '../getDays';
import CalendarRegistration from '@/components/CalendarRegistration';
import pageStyle from './pageStyle.module.css';

const page = async () => {
    const days = await getDaysFromDatabase();
  
  return (
    <div className={pageStyle.main}>
      <CalendarRegistration days={days}/>
    </div>
  )
}

export default page
