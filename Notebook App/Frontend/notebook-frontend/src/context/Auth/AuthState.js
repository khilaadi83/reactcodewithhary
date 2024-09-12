import React from 'react';
import AuthContext from './AuthContext';
import { useState } from 'react';

const AuthState = (props) => {

  const loginUser = async (email, password) => {
      try {
          const response = await fetch(`http://www.localhost:3000/api/auth/login`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email: email, password: password })
          });
          const json = await response.json()
          console.log(email, password)
          console.log(json)
          return json;
      } catch (error) {
          console.error('Error in loginUser:', error);
          throw error;
      }
  }

  const signUpUser = async (formData) => {
      try {
          const { firstname, password, email, phone } = formData;
          console.log(formData)
          const response = await fetch(`http://localhost:3000/api/auth/createUser`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ firstname: firstname, password: password, email: email, phone: phone })
          });
          console.log(formData)
          const json = await response.json()
          console.log(json)
          return json;
      } catch (error) {
          console.error('Error in signUpUser:', error);
          throw error;
      }
  }

  return (
      <AuthContext.Provider value={{ loginUser, signUpUser }}>
          {props.children}
      </AuthContext.Provider>
  )
}
export default AuthState;