// import Days from '@/components/Days'
import React from 'react'
import { getDaysFromDatabase } from '../getDays';
import LogOut from '../../components/LogOut';
import CalendarRegistration from '@/components/CalendarRegistration';

const page = async () => {
    const days = await getDaysFromDatabase();
  
  return (
    <div>
      {/* <Days days={days} /> */}
      <CalendarRegistration days={days}/>
      <LogOut />
    </div>
  )
}

export default page
