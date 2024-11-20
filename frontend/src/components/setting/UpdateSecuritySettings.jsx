import React, { useState } from "react";
import axios from "axios";

const UpdateSecuritySettings = () => {
  const [formData, setFormData] = useState({
    two_factor_auth: false,
    active_sessions: [],
  });

  const [newSession, setNewSession] = useState("");

  // Handle change for toggling two-factor authentication
  const handleToggle = (e) => {
    setFormData({ ...formData, two_factor_auth: e.target.checked });
  };

  // Add a new active session
  const handleAddSession = () => {
    if (newSession.trim() !== "") {
      setFormData({
        ...formData,
        active_sessions: [...formData.active_sessions, newSession.trim()],
      });
      setNewSession("");
    }
  };

  // Remove a specific session
  const handleRemoveSession = (session) => {
    setFormData({
      ...formData,
      active_sessions: formData.active_sessions.filter((s) => s !== session),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/settings/security", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        alert("Security settings updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating security settings:", error);
        alert("Error updating security settings.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Security Settings</h2>

      {/* Two-Factor Authentication */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={formData.two_factor_auth}
            onChange={handleToggle}
          />
          Enable Two-Factor Authentication
        </label>
      </div>

      {/* Active Sessions */}
      <div>
        <h3>Active Sessions</h3>
        <ul>
          {formData.active_sessions.map((session, index) => (
            <li key={index}>
              {session}
              <button
                type="button"
                onClick={() => handleRemoveSession(session)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newSession}
          placeholder="Add new session"
          onChange={(e) => setNewSession(e.target.value)}
        />
        <button type="button" onClick={handleAddSession}>
          Add Session
        </button>
      </div>

      {/* Submit Button */}
      <button type="submit">Update Security Settings</button>
    </form>
  );
};

export default UpdateSecuritySettings;
