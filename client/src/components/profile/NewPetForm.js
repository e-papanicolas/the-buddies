import React from "react";
import { useState, useContext, useNavigate } from "react";
import { UserContext, PetContext } from "../../App";

export default function NewPetForm({ setPets, pets }) {
  const user = useContext(UserContext);
  const currentPet = useContext(PetContext);
  // const navigate = useNavigate();
  const [newPetData, setNewPetData] = useState({
    parent_id: user._id,
    pet_name: "",
    DOB: "",
    weight: 0,
    activity_level: "",
    calorie_goal: 0,
    favorite_things: [],
    allergies: [],
    notes: [],
  });
  const [image, setImage] = useState(null);

  // sends new pet object to back end for creating in database
  const handleSubmitNewPet = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("data", newPetData);
    formData.append("image", image);
    const response = await fetch(`/pets/new`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    await response.json().then((data) => {
      console.log(data);
      setPets([...pets, data.newPet]);
    });
  };

  //  handles updating form state on all changes
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
            <input type="text" name="pet_name" onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <label>
            What is your Buddies birthday ?
            <input type="date" name="DOB" onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <label>
            How much does your Buddie weigh ?
            <input type="number" name="weight" onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <label>
            What is your Buddies activity level ?
            <select name="activity_level" onChange={handleFormChange}>
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
              onChange={handleFormChange}
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
