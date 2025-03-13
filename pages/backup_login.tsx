import Layout from "../components/Layout";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const loginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevent auto redirection
      });

      console.log("SignIn Result: ", result);

      if (result?.error) {
        console.error("Login error:", result.error);
        setError("Invalid email or password.");
      } else {
        console.log("Login success:", result);
        router.push("/"); // Redirect on successful login
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="login-text">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="login-username-container">
            <div>Email</div>
            <input
              className="username-input"
              type="text"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div className="login-password-container">
            <div>Password</div>
            <input
              className="password-input"
              type="password"
              placeholder="Type your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div className="forgot-password">Forgot password?</div>
          </div>
          <button className="login-button">Log in</button>
        </form>

        <div className="signup-container">
          <div>New? Make an account</div>
          <button className="signup-button">Sign up</button>
        </div>
      </div>
    </Layout>
  );
};

export default loginView;
