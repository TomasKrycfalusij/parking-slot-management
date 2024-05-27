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
      <CalendarRegistration days={days}/>
      <LogOut />
    </div>
  )
}

export default page
