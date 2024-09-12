import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";
import { useContext, useEffect } from 'react'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthContext);
  let navigate = useNavigate(); // use this hook to redirect to the home page
  const { loginUser } = context;
  const handleLogin = async (e) => {
    e.preventDefault();
    // Add your login logic here
    let fetchResult = await loginUser(username, password);
    if (fetchResult.success) {
      // save the auth token to local storage and redirect to the home page
      localStorage.setItem("token", fetchResult.token);
      navigate("/");
      console.log(fetchResult.token);
    } else {
      // Handle login error
      alert("Login failed", fetchResult.msg);
    }
  };



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
