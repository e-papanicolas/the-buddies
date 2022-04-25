import React from "react";
import { useState, useContext, useNavigate } from "react";
import { UserContext, PetContext } from "../../App";

export default function NewPetForm({ setPets, pets }) {
  const user = useContext(UserContext);
  // const currentPet = useContext(PetContext);
  // const navigate = useNavigate();
  const [petName, setPetName] = useState("");
  const [DOB, setDOB] = useState("");
  const [weight, setWeight] = useState(0);
  const [activityLevel, setActivityLevel] = useState("");
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [image, setImage] = useState(null);

  // sends new pet object to back end for creating in database
  const handleSubmitNewPet = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("parent_id", user._id);
    formData.append("pet_name", petName);
    formData.append("DOB", DOB);
    formData.append("weight", weight);
    formData.append("activity_level", activityLevel);
    formData.append("calorie_goal", calorieGoal);
    formData.append("image", image);

    for (const key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    const response = await fetch(`/pets/new`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    });

    await response.json().then((data) => {
      console.log(data);
      setPets([...pets, data.newPet]);
    });
  };

  const handleUploadFormChange = (e) => {
    let file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      {/* <button onClick={() => navigate(`/dashboard/${currentPet.pet_name}`)}>
        X
      </button> */}
      <form onSubmit={handleSubmitNewPet} encType="multipart/form">
        <div>
          <h3>Add new Buddie form</h3>
          <label>
            What is your Buddies name ?
            <input
              type="text"
              name="pet_name"
              onChange={(e) => setPetName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            What is your Buddies birthday ?
            <input
              type="date"
              name="DOB"
              onChange={(e) => setDOB(new Date(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            How much does your Buddie weigh ?
            <input
              type="number"
              name="weight"
              onChange={(e) => setWeight(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            What is your Buddies activity level ?
            <select
              name="activity_level"
              onChange={(e) => setActivityLevel(e.target.value)}
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
              onChange={(e) => setCalorieGoal(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div>
          <p>Upload a profile pic for buddie</p>
          <label htmlFor="image" className="upload-photo">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleUploadFormChange}
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
