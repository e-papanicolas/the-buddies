import React from "react";
import { useState } from "react";

export default function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmitLogin(e) {
    e.preventDefault();
    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleLogin(data.user);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      Login
      <form onSubmit={() => handleSubmitLogin}>
        <div>
          <label>
            Email:
            <input type="email" name="email" onChange={handleFormChange} />
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
          <input type="submit" value="Log in" />
        </div>
      </form>
    </div>
  );
}
