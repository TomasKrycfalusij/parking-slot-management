import mongoose, {Schema, model, connect, ObjectId, ConnectOptions } from 'mongoose';
import { env } from 'process';
import { IDay } from '../../models/day';
import connectToDatabase from '../../utils/db';
import { DaySchema } from '../../models/day';

export const getDaysFromDatabase = async () =>{
    try {
      const mongoose = await connectToDatabase();
      const Day = mongoose!.models.Day || model<IDay>('Day', DaySchema);
      const fetchedDays: IDay[] = JSON.parse(JSON.stringify(await Day.find().lean()));
      return fetchedDays;
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
    }
}
  
export const addPersonToDay = async (dayId: ObjectId | string, person: string) => {
    try {
      const mongoose = await connectToDatabase();
      const Day = mongoose!.models.Day || model<IDay>('Day', DaySchema);
      await Day.updateOne({ _id: dayId }, { $push: { bookings: person } });
    } catch (error) {
      console.error('Error adding person to day:', error);
    }
}

export const addPersonToNewDay = async (date: Date, capacity: number) => {
    try {
      const mongoose = await connectToDatabase();
      const Day = mongoose!.models.Day || model<IDay>('Day', DaySchema);
      const newDay = new Day({ date, capacity });
      await newDay.save();
    } catch (error) {
      console.error('Error adding person to day:', error);
    }
}