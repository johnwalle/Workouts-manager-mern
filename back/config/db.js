const mongoose = require('mongoose');
require('colors');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected'.yellow);
  } catch (error) {
    console.error(error);
    console.log('Error while connecting'.red);
  }
};

module.exports = connectDB;