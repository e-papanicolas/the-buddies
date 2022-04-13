import React from "react";
import "../styles/main.css";

export default function Dashboard({ user, currentPet }) {
  console.log(user);
  return (
    <div className="dashboard-container">
      <div className="todays-meals">meals div</div>
      <div className="profile-overview">profile div</div>
      <div className="records-overview">records div</div>
      <div className="reminders">reminders div</div>
    </div>
  );
}
