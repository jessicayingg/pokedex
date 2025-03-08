import Layout from "../components/Layout";

const registerView = () => {
  return (
    <Layout>
      <div className="login-container">
        <div className="login-text">Register</div>
        <div className="login-username-container">
          <div>Username</div>
          <input
            className="username-input"
            type="text"
            placeholder="Type your username"
          ></input>
        </div>
        <div className="login-password-container">
          <div>Password</div>
          <input
            className="password-input"
            type="text"
            placeholder="Type your password"
          ></input>
          <div className="forgot-password">Forgot password?</div>
        </div>
        <button className="login-button">Log in</button>
        <div className="signup-container">
          <div>New? Make an account</div>
          <button className="signup-button">Sign up</button>
        </div>
      </div>
    </Layout>
  );
};

export default registerView;
