import React from 'react'
import { getDaysFromDatabase } from '../getDays';
import ShowRegistrations from '@/components/ShowRegistrations';
import Navbar from '../../components/Navbar';
import pageStyle from './pageStyle.module.css';

const page = async () => {
    const days = await getDaysFromDatabase();
    return (
        <div>
        <h1>Registrace</h1>
        <ShowRegistrations days={days}/>
        </div>
    )
}

export default page
