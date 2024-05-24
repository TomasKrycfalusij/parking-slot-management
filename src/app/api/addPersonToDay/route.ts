import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../utils/db';
import Day from '../../../../models/day';

export async function POST(req: Request) {
  const { dayId, person } = await req.json();

  console.log('Received data:', { dayId, person });

  if (!dayId || !person) {
    return NextResponse.json({ error: 'Day Id and person are required' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const existingDay = await Day.findById(dayId);

    if (!existingDay) {
      return NextResponse.json({ error: 'Day not found' }, { status: 404 });
    }

    if (existingDay.bookings.length >= existingDay.capacity) {
      return NextResponse.json({ error: 'This day is full' }, { status: 400 });
    }

    if (existingDay.bookings.includes(person)) {
      return NextResponse.json({ error: 'This person is already registered' }, { status: 400 });
    }

    existingDay.bookings.push(person);
    await existingDay.save();

    return new Response(JSON.stringify({ message: 'Person added to day' }), { status: 200 });
  } catch (error) {
    console.error('Error adding person to day:', error);
    return new Response(JSON.stringify({ error: 'Error adding person to day' }), { status: 500 });
  }
}
