import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "../../lib/dbConnect"; // Import your DB connection
import User from "../../models/User"; // You'll create this model next
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    console.log("Received request to register user:", { email, password });

    // 1. Validate input
    if (!email || !password) {
      console.log("Validation failed: missing email or password");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      console.log("Connecting to the database...");
      // 2. Connect to the database
      await connectToDB();

      console.log("Checking if user already exists with email:", email);
      // 3. Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("User already exists with email:", email);
        return res.status(400).json({ message: "User already exists" });
      }

      console.log("Hashing the password for user:", email);
      // 3. Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      console.log("Creating new user with email:", email);
      // 4. Create the user without hashing the password
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      console.log("Saving new user to the database...");
      // 5. Save the user to the database
      await newUser.save();

      console.log("User registered successfully:", { email });
      // 6. Send success response
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
