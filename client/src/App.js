import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// We import all the components we need in our app
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Signup from "./components/login/Signup";
import Login from "./components/login/Login";
import Food from "./components/food/Food";
import Health from "./components/health/Health";
import Profile from "./components/profile/Profile";

export default function App() {
  const navigate = useNavigate();

  // set state
  const [currentUser, setCurrentUser] = useState(null);
  // const [errors, setErrors] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);

  // handles login and logout, sets or removes user
  function handleLogin(user) {
    setCurrentUser(user);
    setLoggedIn(true);
    navigate("/dashboard");
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  // fetches the user from api and sets user in state
  // useEffect(() => {
  //   fetch("", {}).then((res) => {
  //     if (res.ok) {
  //       res.json().then((data) => {
  //         setCurrentUser(data.user);
  //         setLoggedIn(true);
  //       });
  //     } else {
  //       res.json().then((data) => {
  //         // setErrors(data.errors);
  //         console.log(data);
  //       });
  //     }
  //   });
  // }, []);

  if (!isLoggedIn) {
    return (
      <div>
        <Routes>
          <Route
            path="/signup"
            element={<Signup handleLogin={handleLogin} />}
          />
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </div>
    );
  }

  return (
    <div>
      <Navbar handleLogOut={handleLogOut} user={currentUser} />
      <Routes>
        <Route path="/dashboard" element={<Dashboard user={currentUser} />} />
        <Route path="/food" element={<Food />} />
        <Route path="/health" element={<Health />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
