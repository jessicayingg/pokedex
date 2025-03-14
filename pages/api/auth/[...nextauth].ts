import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
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

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.name) {
        session.user.name = token.name;
      }
      return session;
    },
  },
});
