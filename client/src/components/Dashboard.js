import React from "react";
import "../styles/main.css";
import { UserContext } from "../App";
import { useContext } from "react";

export default function Dashboard({ currentPet }) {
  const user = useContext(UserContext);
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
