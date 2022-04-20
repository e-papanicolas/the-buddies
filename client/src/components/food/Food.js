import React from "react";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../../App";
import { useContext, useState } from "react";

export default function Food() {
  const navigate = useNavigate();
  const currentPet = useContext(PetContext);
  return (
    <div>
      <p>Food Page</p>
      <button
        onClick={() =>
          navigate(`/food/${currentPet.pet_name}/new_feeding_schedule`)
        }
      >
        Create a feeding schedule for your buddie
      </button>
    </div>
  );
}
