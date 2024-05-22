const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://krycfalusijtomas:Admin123!@localhost:27017/parkingdb?authSource=admin&directConnection=true&tls=false';

const daySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  capacity: { type: Number, required: true },
  bookings: { type: [String], default: [] },
});

const Day = mongoose.model('Day', daySchema);

const seedData = [
  {
    date: new Date('2024-05-01'),
    capacity: 10,
    bookings: ['Tomáš', 'Dan'],
  },
  {
    date: new Date('2024-05-02'),
    capacity: 10,
    bookings: ['Máca'],
  },
  {
    date: new Date('2024-05-03'),
    capacity: 10,
    bookings: ['Tomáš K'],
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
