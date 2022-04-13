import React from "react";
import { useState } from "react";

export default function Signup({ handleLogin }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleLogin(data);
      });
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);
    // })
    // .catch((e) => {
    //   console.log(e);
    // });

    // if (!response.ok) {
    //   const message = `An error has occured: ${response.status}`;
    //   throw new Error(message);
    // }

    // const data = await response.json();
    // console.log(response);
    // console.log(data.user);
    // localStorage.setItem("jwt", user.jwt);
    // handleLogin(data.user);
  };

  return (
    <div>
      Signup
      <form onSubmit={handleSubmitSignup}>
        <div>
          <label>
            Email:
            <input type="email" name="email" onChange={handleFormChange} />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="full_name"
              name="full_name"
              onChange={handleFormChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              onChange={handleFormChange}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  );
}
