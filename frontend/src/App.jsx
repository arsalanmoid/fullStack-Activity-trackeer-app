import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Signin from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<SignUp/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}