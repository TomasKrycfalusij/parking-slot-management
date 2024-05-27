import React from 'react'
import { getDaysFromDatabase } from '../getDays';
import LogOut from '../../components/LogOut';
import CalendarRegistration from '@/components/CalendarRegistration';
import pageStyle from './pageStyle.module.css';
import Navbar from '@/components/Navbar';

const page = async () => {
    const days = await getDaysFromDatabase();
  
  return (
    <div className={pageStyle.main}>
      <Navbar />
      <CalendarRegistration days={days}/>
      <LogOut />
    </div>
  )
}

export default page
