import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "../../lib/dbConnect"; // Import your DB connection
import User from "../../models/User"; // You'll create this model next

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      // 2. Connect to the database
      await connectToDB();

      // 3. Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // 4. Create the user without hashing the password
      const newUser = new User({
        email,
        password, // Store the password as-is (not hashed)
      });

      // 5. Save the user to the database
      await newUser.save();

      // 6. Send success response
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
