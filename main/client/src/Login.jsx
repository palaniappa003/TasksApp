// Login.js
import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "./utils/constant";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post(`${baseURL}/login`, { username, password })
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(true);
        } else {
          // Handle authentication failure
          console.log("Authentication failed");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
