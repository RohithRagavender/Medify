// import React, { useContext, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import AddNewDoctor from "./components/AddNewDoctor";
// import Messages from "./components/Messages";
// import Doctors from "./components/Doctors";
// import { Context } from "./main";
// import axios from "axios";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "./components/Sidebar";
// import AddNewAdmin from "./components/AddNewAdmin";
// import "./App.css";

// const App = () => {
//   const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
//     useContext(Context);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(
//           "https://medify-1-de1j.onrender.com/api/v1/user/admin/me",
//           {
//             withCredentials: true,
//           }
//         );
//         setIsAuthenticated(true);
//         setAdmin(response.data.user);
//       } catch (error) {
//         setIsAuthenticated(false);
//         setAdmin({});
//       }
//     };
//     fetchUser();
//   }, [isAuthenticated]);

//   return (
//     <Router>
//       <Sidebar />
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/doctor/addnew" element={<AddNewDoctor />} />
//         <Route path="/admin/addnew" element={<AddNewAdmin />} />
//         <Route path="/messages" element={<Messages />} />
//         <Route path="/doctors" element={<Doctors />} />
//       </Routes>
//       <ToastContainer position="top-center" />
//     </Router>
//   );
// };

// export default App;


import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://medify-1-de1j.onrender.com/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error.response?.data?.message || error.message);
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, []); // Removed isAuthenticated from dependencies

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      {isAuthenticated && <Sidebar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<ProtectedRoute element={<AddNewDoctor />} />} />
        <Route path="/admin/addnew" element={<ProtectedRoute element={<AddNewAdmin />} />} />
        <Route path="/messages" element={<ProtectedRoute element={<Messages />} />} />
        <Route path="/doctors" element={<ProtectedRoute element={<Doctors />} />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
