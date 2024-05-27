const mongoose = require('mongoose');
const { env } = require('process');

const MONGO_URI = env.DATABASE_URL || 'mongodb://admin:Admin123!@localhost:27017/parkingdb?authSource=admin&directConnection=true&tls=false';

const daySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  capacity: { type: Number, required: true },
  bookings: { type: [String], default: [] },
});

const Day = mongoose.model('Day', daySchema);

async function clearDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Day.deleteMany({});
    console.log('Existing data cleared');
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

clearDatabase();
