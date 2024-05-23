import Days from '@/components/Days'
import React, { useEffect, useState } from 'react'
import { getDaysFromDatabase } from '../getDays';
import { useRouter } from 'next/navigation';
import LogOut from '@/components/LogOut';
import CalendarRegistration from '@/components/CalendarRegistration';

const page = async () => {
    const days = await getDaysFromDatabase();
    console.log(days);

    
  return (
    <div>
      <Days days={days} />
      <CalendarRegistration />
      <LogOut />
    </div>
  )
}

export default page
