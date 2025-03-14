import Layout from "../components/Layout";
import { useState } from "react";

const registerView = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send a POST request to the /api/register endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: username, // Assuming the username is the email here
          password,
        }),
      });

      if (response.ok) {
        setMessage("User registered successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error occurred during registration.");
      }
    } catch (error) {
      setMessage("Error occurred while registering.");
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="login-text">Register</div>
        <div className="login-username-container">
          <div>Name</div>
          <input
            className="username-input"
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="login-username-container">
          <div>Username</div>
          <input
            className="username-input"
            type="text"
            placeholder="Type your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="login-password-container">
          <div>Password</div>
          <input
            className="password-input"
            type="text"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="forgot-password">Forgot password?</div>
        </div>
        <button
          className="login-button register-account-button"
          onClick={handleSubmit}
        >
          Register
        </button>
        {/* Extra message thing */}
        {message && <div className="message">{message}</div>}
      </div>
    </Layout>
  );
};

export default registerView;
