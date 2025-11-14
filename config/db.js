const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://livescore_db_user:DC2oHrbxc4C4ZX9X@livescore.nawcqhn.mongodb.net/Test_table?authSource=admin'
    );
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
