const mongoose = require("mongoose");
const dotenv = require("dotenv");
const initialTasks = require("../data/initialTasks");
const Task = require("../models/TaskSchema");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("MongoDB connected");
        seedDatabase();
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    const taskCount = await Task.countDocuments();

    if (taskCount === 0) {
      console.log("No tasks found, seeding database...");
      await Task.insertMany(initialTasks);
      console.log("Database seeded with initial tasks.");
    } else {
      console.log("Tasks already exist, skipping seed.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB or seeding database:", error);
  }
};

module.exports = connectDB;
