import mongoose, { Schema, Document } from 'mongoose';

export interface IDay extends Document {
  date: Date;
  capacity: number;
  bookings: Array<string>;
}

export const DaySchema: Schema = new Schema({
  date: { type: Date, required: true },
  capacity: { type: Number, required: true },
  bookings: { type: [String], default: [] },
}, {
  timestamps: true,
});

export default mongoose.models.Day || mongoose.model<IDay>('Day', DaySchema);
