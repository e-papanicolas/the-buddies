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
import NewPetForm from "./components/profile/NewPetForm";
import UpdatePetForm from "./components/profile/UpdatePetForm";
import NewFeedingSchedule from "./components/food/NewFeedingSchedule";
import NewMealEntryForm from "./components/food/NewMealEntryForm";
import NewHealthRecordForm from "./components/health/NewHealthRecordForm";
import NewVetForm from "./components/health/NewVetForm";
import NewApptForm from "./components/health/NewApptForm";

export default function App() {
  const navigate = useNavigate();

  // set state
  const [currentUser, setCurrentUser] = useState({
    email: "elenipapanicolas@gmail.com",
    password: "123",
    full_name: "Eleni Papanicolas",
    id: "625717a4166ed55a7e527574",
    pets: [],
    created: "2022-04-13T18:34:12.479Z",
  });
  const [currentPet, setCurrentPet] = useState({});
  // const [errors, setErrors] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(true);

  // handles login and logout, sets or removes user
  function handleLogin(user) {
    setCurrentUser(user);
    setLoggedIn(true);
    navigate("/dashboard");
  }

  function handleLogOut() {
    fetch(`/users/${currentUser.id}/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoggedIn(false);
    navigate("/");
  }

  // fetches the user from api and sets user in state
  // useEffect(() => {
  //   fetch(`/users/${currentUser.id}`).then((res) => {
  //     if (res.ok) {
  //       res.json().then((data) => {
  //         setCurrentUser(data.user);
  //         setLoggedIn(true);
  //       });
  //     } else {
  //       res.json().then((data) => {
  // setErrors(data.errors);
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
    <div className="app">
      <Navbar
        handleLogOut={handleLogOut}
        user={currentUser}
        setCurrentPet={setCurrentPet}
      />
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard user={currentUser} currentPet={currentPet} />}
        />
        <Route path="/food/:name" element={<Food />}>
          <Route path="new_feeding_schedule" element={<NewFeedingSchedule />} />
          <Route path="new_meal" element={<NewMealEntryForm />} />
        </Route>
        <Route path="/health/:name" element={<Health />}>
          <Route path="new_record" element={<NewHealthRecordForm />} />
          <Route path="new_vet" element={<NewVetForm />} />
          <Route path="new_appt" element={<NewApptForm />} />
        </Route>
        <Route path="/profile/:name" element={<Profile />}>
          <Route path="update_pet" element={<UpdatePetForm />} />
        </Route>
        <Route path="/new_pet" element={<NewPetForm />} />
      </Routes>
    </div>
  );
}
