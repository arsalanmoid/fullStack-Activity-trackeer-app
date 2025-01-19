import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username: email,
        password,
      });
      
      console.log(response.data);
      alert("Sign-in successful!");
      const token = response.data.token
      localStorage.setItem("token",token)
      navigate("/dashboard");
      
      
    } catch (e) {
      if (e.response) {
        const errorMessage = e.response.data?.msg;

        if (errorMessage === "Invalid credentials") {
          alert("Invalid credentials. Please check your email and password.");
        } 
        else if (errorMessage==="user doesn't exist") {
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSignIn}>
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
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
