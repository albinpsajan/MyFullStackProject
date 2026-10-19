import React, { useState } from 'react';
import axios from "axios";
import { apiUrl } from "../config";
function RegistrationForm() {

  // 1. State is an object, not just a string
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_picture: null,
    role: "student"
  });
  const [message, setMessage] = useState("");

  // 2. The Universal Handler
  const handleChange = (e) => {

    const { name, value } = e.target;

    // Update ONLY the field that changed, keep the rest
    setFormData(prevState => ({
      ...prevState,// Spread operator copies existing fields
      [name]: value
    }));
  };
    // Handle file input
  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      profile_picture: e.target.files[0]
    }));
  };

  // POST REQUEST
  const handleSubmit = async(e) => {
    e.preventDefault();// Stop page reload
    const data = new FormData();

    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("email", formData.email);

    if (formData.profile_picture) {
      data.append("profile_picture", formData.profile_picture);
    }
    // console.log(formData);
    try {
      const response = await axios.post(
        apiUrl("/academic/api/students/"),
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(response.data);
      setMessage("Student created! ID: " + response.data.id);
      // Clear form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        profile_picture: null
      });
    } catch (error) {
      console.log("ERROR:", error.response?.data);

      if (error.response?.status === 401 || error.response?.status === 403) {
        setMessage("Please log in before registering a student.");
      } else {
        setMessage("Failed to save data.");
      }
    }
  };

  return (
    <div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>

          <input
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <input
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* File Upload */}
          <input
            type="file"
            name="profile_picture"
            onChange={handleFileChange}
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button type="submit">Register</button>

      </form>
      {/* Output Message */}
      <p>{message}</p>
    </div>
  );
}

export default RegistrationForm;