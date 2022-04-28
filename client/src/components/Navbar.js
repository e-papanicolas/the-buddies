import React from "react";
import "../styles/main.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, PetContext } from "../App";
import { useContext } from "react";

export default function Navbar({ setCurrentPet, pets }) {
  // const user = useContext(UserContext);
  const currentPet = useContext(PetContext);
  const navigate = useNavigate();
  console.log(currentPet);

  const handlePetChange = (e) => {
    const petName = e.target.value;
    const pet = pets.find((pet) => pet.pet_name === petName);
    console.log(pets);
    setCurrentPet(pet);
    navigate(`/dashboard/${petName}`);
  };

  // if (!currentPet) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="nav">
      <div className="nav-left">
        <h2 onClick={() => navigate(`/dashboard/${currentPet.pet_name}`)}>
          DASHBOARD
        </h2>
        <form>
          <select onChange={(e) => handlePetChange(e)}>
            {pets.map((pet) => {
              return (
                <option key={pet._id} value={pet.pet_name}>
                  {pet.pet_name}
                </option>
              );
            })}
          </select>
        </form>
        {/* <img src={currentPet.image.url} alt="a small version of pet avatar" /> */}
      </div>
      <div className="nav-right">
        <Link to="/new_pet">+</Link>
      </div>
    </div>
  );
}
