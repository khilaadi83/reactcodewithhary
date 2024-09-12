import React, { useState } from 'react';
import AuthContext from "../context/Auth/AuthContext";
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const { signUpUser } = context;
  const [formData, setFormData] = useState({
    firstname: '',
    password: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    
  let jsonResult = await signUpUser(formData);
  if  (jsonResult.success) {
    // save the auth token to local storage and redirect to the login page
    localStorage.setItem("token", jsonResult.token);
    navigate("/login");
  }
  // save the auth token to local storage and redirect to the login page
 
    
  };

  return (
    <div className="container mt-4">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
