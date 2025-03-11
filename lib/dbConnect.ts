import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

export async function connectToDB() {
  if (mongoose.connection.readyState >= 1) {
    return; // Already connected, no need to reconnect
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}
