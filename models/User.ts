import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures emails are unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
});

// Create a User model based on the schema
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
