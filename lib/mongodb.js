const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://krycfalusijtomas:Admin123!@localhost:27017/parkingdb?authSource=admin&directConnection=true&tls=false';

console.log('MONGODB_URI', MONGO_URI);

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
