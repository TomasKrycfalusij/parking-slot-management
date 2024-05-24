import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../utils/db';
import Day from '../../../../models/day';

export async function POST(req: Request) {
  try {
    const { date, capacity, person } = await req.json();
    console.log('Received data:', { date, capacity, person });

    if (!date || !capacity || !person) {
      return NextResponse.json({ error: 'Date, capacity, and person are required' }, { status: 400 });
    }

    await connectToDatabase();

    const existingDay = await Day.findOne({ date });

    if (existingDay) {
      return NextResponse.json({ error: 'Day already exists' }, { status: 400 });
    }

    const newDay = new Day({ date, capacity, bookings: [person] }); // Inserting the first person
    console.log('New day object:', newDay);
    await newDay.save();
    console.log('Day saved successfully');

    return NextResponse.json({ message: 'New day created and person added' }, { status: 200 });
  } catch (error) {
    console.error('Error creating new day:', error);
    return NextResponse.json({ error: 'Error creating new day' }, { status: 500 });
  }
}
