import React, { useState } from "react";
import axios from "axios";

const UpdatePrivacySettings = () => {
  const [formData, setFormData] = useState({
    profile_visibility: "public",
    blocked_accounts: [],
    unblock_user_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/settings/privacy", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        alert("Privacy settings updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating privacy settings:", error);
        alert("Error updating privacy settings.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="profile_visibility" onChange={handleChange}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <input
        name="blocked_accounts"
        placeholder="Block User IDs"
        onChange={handleChange}
      />
      <input
        name="unblock_user_id"
        placeholder="Unblock User ID"
        onChange={handleChange}
      />
      <button type="submit">Update Privacy Settings</button>
    </form>
  );
};

export default UpdatePrivacySettings;
