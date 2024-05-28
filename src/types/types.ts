import { ObjectId } from 'mongoose';

export interface DayType {
    _id: string | ObjectId;
    date: Date;
    capacity: number;
    bookings: string[];
}