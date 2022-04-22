import React from "react";
import "../styles/main.css";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../App";
import { useContext, useState } from "react";

export default function Dashboard() {
  const currentPet = useContext(PetContext);
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState({});

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const uploadPicture = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch("/image", {
      method: "POST",
      // headers: {
      //   Accept: "application/json",
      // },
      body: formData,
    });

    const data = await response.json();
    console.log(data);

    const base64Flag = "data:image/jpeg;base64,";
    const imageStr = arrayBufferToBase64(data.img.data.data);
    setProfilePic({ image: base64Flag + imageStr });
    console.log(profilePic);
  };

  return (
    <div className="dashboard-container">
      <div className="todays-meals">
        {/* {!currentPet.meal_plan.breakfast ? (
          <p>{currentPet.pet_name} doesn't have a meal plan yet.</p>
        ) : (
          <>
            {" "}
            <h3>{currentPet.pet_name}'s Meal Plan</h3>
            <p>
              Breakfast is at <em>{currentPet.meal_plan.breakfast}</em>
            </p>
            <p>
              Lunch is at <em>{currentPet.meal_plan.lunch}</em>
            </p>
            <p>
              Dinner is at <em>{currentPet.meal_plan.dinner}</em>
            </p>
          </>
        )} */}
        <button onClick={() => navigate(`/food/${currentPet.pet_name}`)}>
          Go to Food Page
        </button>
      </div>
      <div className="profile-overview">
        <h3>All About {currentPet.pet_name}</h3>
        <p>Current weight: {currentPet.weight}</p>
        <p>Current calorie goal: {currentPet.calorie_goal}</p>
        <p>Current activity level: {currentPet.activity_level}</p>
        <button onClick={() => navigate(`/profile/${currentPet.pet_name}`)}>
          Go to Full Profile
        </button>
      </div>
      <div className="records-overview">records div</div>
      <div className="reminders">
        <p>reminders div</p>
        <form onSubmit={uploadPicture}>
          <div>
            <p>Upload a profile pic for buddie</p>
            <label htmlFor="image" className="upload-photo">
              <input type="file" name="image" accept="image/*" />
            </label>
            <input type="submit" />
          </div>
          <img alt="test" src={profilePic} />
        </form>
      </div>
    </div>
  );
}
