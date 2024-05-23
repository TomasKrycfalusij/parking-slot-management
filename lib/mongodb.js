const mongoose = require('mongoose');
import { env } from 'process';

const MONGO_URI = env.DATABASE_URL;

if (!MONGO_URI) {
  throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local'
  );
}

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to database.', error);
  }
}

export default connectToDatabase;
