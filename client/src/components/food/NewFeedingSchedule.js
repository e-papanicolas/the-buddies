import React from "react";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../../App";
import { useContext, useState } from "react";

export default function NewFeedingSchedule() {
  const navigate = useNavigate();
  const currentPet = useContext(PetContext);
  const [feedingSchedFormData, setFormData] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    pet_id: currentPet.id,
  });
console.log(feedingSchedFormData)
  const handleFormChange = (e) => {
    setFormData({
      [e.target.name]: e.target.value.toString(),
    });
  };

  const handleSubmitNewFeedingSchedule = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `/pets/${currentPet.pet_name}/new_feeding_schedule`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedingSchedFormData),
      }
    );

    await response.json().then((data) => {
      console.log(data);
    });
  };

  return (
    <div>
      <button onClick={() => navigate(`/food/${currentPet.pet_name}`)}>
        X
      </button>
      <h3>new feeding schedule form</h3>
      <form onSubmit={handleSubmitNewFeedingSchedule}>
        <div>
          <label>
            When does your buddie eat Breakfast?
            <input type="time" name="breakfast" onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <label>
            When does your buddie eat Lunch?
            <input type="time" name="lunch" onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <label>
            When does your buddie eat Breakfast?
            <input type="time" name="dinner" onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <input type="submit" value="Create my Scheduole" />
        </div>
      </form>
    </div>
  );
}
