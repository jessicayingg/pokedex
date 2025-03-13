import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

export async function connectToDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to DB");
    return; // Already connected, no need to reconnect
  }

  try {
    console.log("Connecting to DB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}
