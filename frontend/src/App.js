import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import WeatherFull from "./components/WeatherFull";
import History5Days from "./components/History5Days";
import RiverLevel from "./components/RiverLevel";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/clima" element={<WeatherFull />} />
        <Route path="/historico" element={<History5Days />} />
        <Route path="/rio" element={<RiverLevel />} />
      </Routes>
    </BrowserRouter>
  );
}
