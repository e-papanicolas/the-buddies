import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

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

export const UserContext = createContext({});

export function App() {
  const navigate = useNavigate();

  // set state
  const [currentUser, setCurrentUser] = useState({});
  const [allPets, setPets] = useState([]);
  const [currentPet, setCurrentPet] = useState({});
  // const [errors, setErrors] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(true);

  // handles login and logout, sets or removes user
  function handleLogin(user) {
    setCurrentUser(user);
    setLoggedIn(true);
    navigate(`/dashboard/${currentPet.name}`);
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
  useEffect(() => {
    fetch(`/users/62585a8f2802361968104ef2`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((e) => console.log(e));
  }, [currentUser.id]);

  // fetches all pets that belong to user
  useEffect(() => {
    fetch(`/pets/62585a8f2802361968104ef2/all_pets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setCurrentPet(data[0]);
      })
      .catch((e) => console.log(e));
  }, []);

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
      <UserContext.Provider value={currentUser}>
        <Navbar
          handleLogOut={handleLogOut}
          setCurrentPet={setCurrentPet}
          pets={allPets}
        />
        <Routes>
          <Route
            path="/dashboard/:name"
            element={<Dashboard currentPet={currentPet} />}
          />
          <Route path="/food/:name" element={<Food />}>
            <Route
              path="new_feeding_schedule"
              element={<NewFeedingSchedule />}
            />
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
          <Route
            path="/new_pet"
            element={<NewPetForm setPets={setPets} pets={allPets} />}
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}
