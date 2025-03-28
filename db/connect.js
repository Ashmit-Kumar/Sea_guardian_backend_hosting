const mongoose = require('mongoose');

const connectDB = async (Database) => {
  try {
    const db_url = process.env.MONGODB_URL;
    // console.log(db_url);
    if (!db_url) {
      throw new Error('MongoDB URL is not defined in environment variables');
    }
    await mongoose.connect(db_url,{
      dbName: Database, 
    });
    console.log('MongoDB connected');
    // console.log(mongoose.connect(db_url));
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
// connectDB()
module.exports = { connectDB };