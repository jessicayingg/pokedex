import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

// Configuration object for NextAuth
export default NextAuth({
  providers: [
    // "Custom" sign up with name, email, and password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
        },
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      // Runs when a user submits the login form
      async authorize(credentials) {
        const { name, email, password } = credentials ?? {};
        console.log("Credentials received: ", name, email, password);

        // Connect to the database
        await connectToDB();

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        if (!password) {
          throw new Error("Password has issues");
        }

        // Checking password
        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {
          throw new Error("Incorrect email or password.");
        }

        return { id: user.id, name: user.name, email: user.email }; // Return user object
      },
    }),
  ],
  // Sessions are stored in JSON Web Tokens
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Log in redirects to home page
    signOut: "/login", // Log out redirects to login page
  },
  callbacks: {
    // Runs every time a JWT is created or updated
    // User is returned from authorize(), token is the stored JWT made by NextAuth
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    // Runs when a session is accessed on the site
    // Sets the session as the current token user's
    async session({ session, token }) {
      if (session.user && token.name) {
        session.user.name = token.name;
      }
      return session;
    },
  },
});
