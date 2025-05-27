import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "../../lib/dbConnect";
import User from "../../models/User"; 
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    console.log("Received request to register user:", {
      name,
      email,
      password,
    });

    // Check input
    if (!name || !email || !password) {
      console.log("Validation failed: missing email or password");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      console.log("Connecting to the database...");
      // Connect to the database
      await connectToDB();

      console.log("Checking if user already exists with email:", email);
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("User already exists with email:", email);
        return res.status(400).json({ message: "User already exists" });
      }

      console.log("Hashing the password for user:", email);
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log("Creating new user with email:", email);
      // Create user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      console.log("Saving new user to the database...");
      // Save the user to the database
      await newUser.save();

      console.log("User registered successfully:", { email, name });
      // Success!
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    console.log("Method not allowed:", req.method);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
