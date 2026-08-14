import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext); // context
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

  // handle input
  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN FUNCTION
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api-token-auth/",
        creds
      );

      const token = res.data.token;

      // Save token
      localStorage.setItem("userToken", token);

      // Attach token globally
      axios.defaults.headers.common[
        "Authorization"
      ] = `Token ${token}`;

      // store user globally
      login({ username: creds.username });

      alert("Login Successfull!");
    } catch (err) {
      alert("Invalid Credentials");
      console.log(err.response?.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />

      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
