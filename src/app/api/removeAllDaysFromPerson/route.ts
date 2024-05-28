import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../utils/db';
import Day from '../../../../models/day';

export async function POST(req: Request) {
  const { person } = await req.json();

  console.log('Received data:', { person });

  if (!person) {
    return NextResponse.json({ error: 'Person is required' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const allDays = await Day.find();

    const promises = allDays.map(async (day) => {
      const personIndex = day.bookings.indexOf(person);

      if (personIndex !== -1) {
        day.bookings.splice(personIndex, 1);
        await day.save();
      }
    });

    await Promise.all(promises);

    return new Response(JSON.stringify({ message: 'All registrations for the person removed' }), { status: 200 });
  } catch (error) {
    console.error('Error removing person from all days:', error);
    return new Response(JSON.stringify({ error: 'Error removing person from all days' }), { status: 500 });
  }
}
