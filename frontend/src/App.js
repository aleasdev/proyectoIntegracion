import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import useUserContext from "./hooks/useUserContext";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Survey from "./pages/Survey";
import FullList from "./pages/FullList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Pomodoro from "./pages/Pomodoro"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from 'react';

function App() {
  const { user } = useUserContext();
  const browsed = JSON.parse(localStorage.getItem("browsed"));
  console.log({ browsed });

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col justify-between text-slate-600">
          <div className="w-full">
            <Navbar />
            <div className="max-w-7xl mx-auto px-8">
              <Routes>
                <Route
                  path="/"
                  element={
                    user ? (
                      <Home />
                    ) : !browsed ? (
                      <Navigate to="/welcome" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route path="/create" element={<Create />} />
                <Route path="/edit" element={<Edit />} />
                <Route
                  path="/full-list"
                  element={
                    user ? (
                      <FullList />
                    ) : !browsed ? (
                      <Navigate to="/welcome" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/pomodoro"
                  element={
                    user ? (
                      <Pomodoro />
                    ) : !browsed ? (
                      <Navigate to="/welcome" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  } 
                />
                <Route
                  path="/survey"
                  element={
                    user ? (
                      <Survey />
                    ) : !browsed ? (
                      <Navigate to="/welcome" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/signup"
                  element={!user ? <Signup /> : <Navigate to="/" />}
                />
                <Route path="/welcome" element={<Welcome />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}

export default App;