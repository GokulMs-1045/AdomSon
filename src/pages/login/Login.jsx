import React, { useState } from "react";
import "./SignUp.css";
import { FaUser, FaLock } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign up successful!");
        console.log(data);
      } else {
        alert(data.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="signup">
    
    <form className="signup-container" onSubmit={handleSubmit}>
      <div className="background-circles"></div>
      <div className="bubble-container">
        <div className="big-bubble"></div>
        <div className="small-bubble"></div>
        <div className="top-bubble"></div>
      </div>
      <div className="empty-box"></div>

      <div className="signup-box">
        <h2 className="title">Sign Up</h2>
        <div className="signup-box-container">
          <label htmlFor="email">Email</label>
          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-box">
            <FaLock className="icon" />
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FiEye
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </div>

          <a href="#" className="forgot">Forgot password?</a>
          <button type="submit" className="s-submit-btn">Submit</button>
        </div>
      </div>

     
    </form>
    </div>
  );
};

export default SignUp;