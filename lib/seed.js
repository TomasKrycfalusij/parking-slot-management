const mongoose = require('mongoose');
const { env } = require('process');


const MONGO_URI = env.DATABASE_URL || 'mongodb://admin:Admin123!@localhost:27017/parkingdb?authSource=admin&directConnection=true&tls=false';

const daySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  capacity: { type: Number, required: true },
  bookings: { type: [String], default: [] },
});

const Day = mongoose.model('Day', daySchema);

const seedData = [
  {
    date: new Date('2024-05-20'),
    capacity: 2,
    bookings: ['Tomáš', 'Dan'],
  },
  {
    date: new Date('2024-05-23'),
    capacity: 2,
    bookings: ['Máca'],
  },
  {
    date: new Date('2024-05-25'),
    capacity: 2,
    bookings: ['Tomáš K', 'Pepa'],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Day.deleteMany({});
    console.log('Existing data cleared');

    const result = await Day.insertMany(seedData);
    console.log('Seed data inserted successfully:', result);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();
