import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch contact information from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/settings/contactUs")
      .then((response) => {
        setContactInfo(response.data.contactInfo);
      })
      .catch((err) => {
        console.error("Error fetching contact info:", err);
      });
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit the contact form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .put("http://localhost:5000/settings/contactUs", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setFormData({ email: "", message: "" });
      })
      .catch((err) => {
        console.error("Error submitting contact inquiry:", err);
        setError(
          err.response?.data?.message || "An error occurred while submitting."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Contact Us</h2>

      {/* Display contact information */}
      {contactInfo ? (
        <div>
          <h3>Contact Information:</h3>
          <p>
            <strong>Emails:</strong>
          </p>
          <ul>
            {Object.entries(contactInfo.Email).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
          <p>
            <strong>Phone Numbers:</strong>
          </p>
          <ul>
            {Object.entries(contactInfo.Phone_Number).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading contact information...</p>
      )}

      {/* Contact form */}
      <div>
        <h3>Send Us a Message</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
