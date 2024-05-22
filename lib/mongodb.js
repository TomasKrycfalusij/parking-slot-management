import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://localhost:27017/myDatabase";

console.log('MONGODB_URI', MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    console.log(cached.conn)
    console.log("cached")
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("not cached", mongoose)
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('MongoDB Connected');
            return mongoose
        });
    } catch (error) {
        console.error('MongoDB Connection Error', error);
        return error;
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
