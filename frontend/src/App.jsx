import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
// import Chatbot from "./components/chatbot";


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://medify-1-de1j.onrender.com/api/v1/user/patient/me",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setIsAuthenticated(true);
  //       setUser(response.data.user);
  //     } catch (error) {
  //       setIsAuthenticated(false);
  //       setUser({});
  //     }
  //   };
  //   fetchUser();
  // }, [isAuthenticated]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://medify-1-de1j.onrender.com/api/v1/user/patient/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          setUser({});
        } else {
          console.error("An error occurred:", error);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        {/* <Chatbot/> */}
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
