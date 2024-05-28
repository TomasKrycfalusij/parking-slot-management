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
    capacity: 10,
    bookings: ['Arnoštová Eva', 'Bělohradský Vladimír', 'Bryknar Tomáš', 'Hess Marcel', 'Holcová Pavlína', 'Holec Tomáš', 'Jasso Miroslav', 'Kačmár Vítězslav', 'Košek Michal', 'Kvapil Josef'],
  },
  {
    date: new Date('2024-05-25'),
    capacity: 10,
    bookings: ['Lád Tomáš', 'Matoušek Martin', 'Netrhová Štěpánka', 'Obrátil Jan', 'Pecina David', 'Plašek Anna', 'Pohořalý Daniel', 'Samek Pavel', 'Šidák František', 'Solnař Petr'],
  },
  {
    date: new Date('2024-05-27'),
    capacity: 10,
    bookings: ['Spurný Stanislav', 'Tvrdík Martin', 'Vašák Petr', 'Vykoukal Aleš', 'Hloupý Ondřej', 'Kosina Jan', 'Vyskoč Ondřej', 'Kotas Oldřich', 'Novák Jakub', 'Kulhánek Tomáš'],
  },
  {
    date: new Date('2024-05-30'),
    capacity: 10,
    bookings: ['Dědek Martin'],
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
