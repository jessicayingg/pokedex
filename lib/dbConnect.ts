import mongoose from "mongoose";

// MongoDB URI from env
const MONGO_URI = process.env.MONGO_URI as string;

export async function connectToDB() {
  // Ready states:
  //   0 = disconnected
  //   1 = connected
  //   2 = connecting
  //   3 = disconnecting
  if (mongoose.connection.readyState >= 1) {
    // Avoids reconnecting, which is bad
    console.log("Already connected to DB");
    return; // No need to reconnect, return
  }

  try {
    console.log("Connecting to DB...");
    // Await - makes sure connection finishes before continuing
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    // In case of error
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}
