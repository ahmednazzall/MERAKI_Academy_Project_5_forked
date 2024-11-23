import React, { useState } from "react";
import axios from "axios";

const UpdateGeneralSettings = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    bio: "",
    profile_image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/settings/general", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        alert("Settings updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating settings:", error);
        alert("Error updating settings.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="user_name" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <textarea name="bio" placeholder="Bio" onChange={handleChange}></textarea>
      <input
        name="profile_image"
        placeholder="Profile Image URL"
        onChange={handleChange}
      />
      <button type="submit">Update Settings</button>
    </form>
  );
};

export default UpdateGeneralSettings;
