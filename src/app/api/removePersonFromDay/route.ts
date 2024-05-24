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

    const personIndex = existingDay.bookings.indexOf(person);

    if (personIndex === -1) {
      return NextResponse.json({ error: 'This person is not registered for this day' }, { status: 400 });
    }

    existingDay.bookings.splice(personIndex, 1);
    await existingDay.save();

    return new Response(JSON.stringify({ message: 'Person removed from day' }), { status: 200 });
  } catch (error) {
    console.error('Error removing person from day:', error);
    return new Response(JSON.stringify({ error: 'Error removing person from day' }), { status: 500 });
  }
}
