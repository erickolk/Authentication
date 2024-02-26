import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/authPlatformDB');
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Encerrar o processo com falha
    process.exit(1);
  }
};

module.exports = connectDB;
