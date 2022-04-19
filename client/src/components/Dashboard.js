import React from "react";
import "../styles/main.css";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard({ currentPet }) {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <div className="todays-meals">meals div</div>
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
      <div className="reminders">reminders div</div>
    </div>
  );
}
