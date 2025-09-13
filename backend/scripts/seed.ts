import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

// Load environment variables
dotenv.config();

const seedUsers = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Check if users already exist
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    const existingUser = await User.findOne({ email: 'user@example.com' });

    if (!existingAdmin) {
      const adminUser = new User({
        firstName: 'System',
        lastName: 'Administrator',
        email: 'admin@example.com',
        password: 'Admin123!',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Demo admin user created: admin@example.com / Admin123!');
    } else {
      console.log('Demo admin user already exists');
    }

    if (!existingUser) {
      const regularUser = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'user@example.com',
        password: 'User123!',
        role: 'user'
      });
      await regularUser.save();
      console.log('Demo regular user created: user@example.com / User123!');
    } else {
      console.log('Demo regular user already exists');
    }

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();
