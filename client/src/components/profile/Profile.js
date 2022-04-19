import React from "react";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../../App";
import { useContext } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const currentPet = useContext(PetContext);
  const birthday = new Date(currentPet.DOB).toDateString();
  return (
    <div>
      <h2>HI! I'm {currentPet.pet_name}</h2>
      <div>
        <h5>INFO:</h5>
        <p>BIRTHDAY: {birthday}</p>
        <p>WEIGHT: {currentPet.weight}</p>
        <p>ACTIVITY LEVEL: {currentPet.activity_level}</p>
        <p>CALORIE GOAL: {currentPet.calorie_goal}</p>
        <p>ALLERGIES: </p>
        <p>FAVORITE THINGS: </p>
        <p>NOTES: </p>
      </div>
      <button onClick={() => navigate(`update_pet`)}>
        UPDATE {currentPet.pet_name}'s PROFILE
      </button>
    </div>
  );
}
