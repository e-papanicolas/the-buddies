import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../App";

export default function NewPetForm({ setUser }) {
  const user = useContext(UserContext);

  const [newPetData, setNewPetData] = useState({
    parent_id: user.id,
    pet_name: "",
    DOB: "",
    weight: 0,
    activity_level: "",
    calorie_goal: 0,
    favorite_things: [],
    allergies: [],
    notes: [],
  });

  const handleSubmitNewPet = async (e) => {
    e.preventDefault();
    const response = await fetch(`/pets/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPetData),
    });

    await response.json().then((data) => {
      setUser({ ...user });
      console.log(user);
    });
    //, pets: [...user.pets, data._id]
  };

  const handleFormChange = (e) => {
    if (e.target.name === "weight" || "calorie_goal") {
      setNewPetData({
        ...newPetData,
        [e.target.name]: parseInt(e.target.value),
      });
    }
    if (e.target.name === "DOB") {
      setNewPetData({
        ...newPetData,
        [e.target.name]: new Date(e.target.value),
      });
    }

    setNewPetData({ ...newPetData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmitNewPet}>
        <div>
          <h3>Add new Buddie form</h3>
          <label>
            What is your Buddies name ?
            <input
              type="text"
              name="pet_name"
              // value={newPetData.pet_name}
              onChange={handleFormChange}
            />
          </label>
        </div>
        <div>
          <label>
            What is your Buddies birthday ?
            <input
              type="date"
              name="DOB"
              // value={newPetData.DOB}
              onChange={handleFormChange}
            />
          </label>
        </div>
        <div>
          <label>
            How much does your Buddie weigh ?
            <input
              type="number"
              name="weight"
              // value={newPetData.weight}
              onChange={handleFormChange}
            />
          </label>
        </div>
        <div>
          <label>
            What is your Buddies activity level ?
            <select
              name="activity_level"
              // value={newPetData.activity_level}
              onChange={handleFormChange}
            >
              <option value="Select an activity level">
                Select an activity level
              </option>
              <option value="Low Activity">Low Activity</option>
              <option value="Moderate Activity">Moderate Activity</option>
              <option value="High Activity">High Activity</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            What is your Buddies current calorie goal ?
            <input
              type="number"
              name="calorie_goal"
              // value={newPetData.calorie_goal}
              onChange={handleFormChange}
            />
          </label>
        </div>
        {/* <div>
          <label>
            :
            <input type="" name="" onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <label>
            :
            <input type="" name="" onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <label>
            :
            <input type="" name="" onChange={handleFormChange} />
          </label>
        </div> */}
        <div>
          <input type="submit" value="Add my Buddie" />
        </div>
      </form>
    </div>
  );
}
