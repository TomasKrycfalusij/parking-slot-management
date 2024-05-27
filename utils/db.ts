const mongoose = require('mongoose');

const MONGO_URI = process.env.DATABASE_URL || 'mongodb://admin:Admin123!@localhost:27017/parkingdb?authSource=admin&directConnection=true&tls=false';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  await mongoose.connect(MONGO_URI);
  return mongoose
};

export default connectToDatabase;

