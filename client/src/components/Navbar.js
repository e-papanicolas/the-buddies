import React from "react";
import "../styles/main.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

export default function Navbar({ setCurrentPet, pets }) {
  const user = useContext(UserContext);

  const handlePetChange = (e) => {
    if (e.target.value === "Select a pet") return;
    const petName = e.target.value;
    const pet = user.pets[petName];
    setCurrentPet(pet);
  };

  if (!user.pets) {
    return <p>Loading...</p>;
  }

  return (
    <div className="nav">
      <div className="nav-left">
        <h2>DASHBOARD</h2>
        <form>
          <select onChange={(e) => handlePetChange(e)}>
            <option value="Select a pet">Select a pet</option>
            {pets.map((pet) => {
              return (
                <option key={pet._id} value={pet.pet_name}>
                  {pet.pet_name}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <div className="nav-right">
        <Link to="/new_pet">+</Link>
      </div>
    </div>
  );
}
