import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function buttonHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstName,
        lastName,
        username: email,
        password,
      });
      console.log(response.data);
      const token = response.data.token
      alert("Signup successful!");
      localStorage.setItem("token",token)
      navigate("/dashboard");
    } catch (e) {
      if (e.response) {
    
        const errorMessage = e.response.data?.msg;

       
        if (errorMessage === "please enter valid credentials") {
          alert("Please enter valid credentials.");
        } else if (errorMessage === "User already exist") {
          alert("User already exists.");
        } else {
          alert("Something went wrong. Please try again.");
        }
      } else {
        
        alert("Network error. Please try again.");
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form className="space-y-4">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={buttonHandler}
            className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already an existing user?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-blue-500 hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
