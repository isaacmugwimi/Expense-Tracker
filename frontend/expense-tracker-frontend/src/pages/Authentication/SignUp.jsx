import React, { useState } from "react";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import user_pic from "../../assets/profile-pics/user.svg";
import upload from "../../assets/profile-pics/upload.svg";
import delete_icon from "../../assets/profile-pics/trash-2.svg";
import { Link } from "react-router-dom";
import "../../css/Login.css";
import "../../css/SignUp.css";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/helper";
//
//
export default function SignUp() {
  // State to store the uploaded image
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState({
    field: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Convert image to base64 string for preview
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteProfilePic = (e) => {
    e.preventDefault();
    setProfilePic(null);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError({ field: "", message: "" }); //clear old error

    const { fullName, email, password } = formData;

    const nameResults = validateName(fullName);
    if (nameResults !== true) {
      console.error(nameResults);
      setError({ field: "fullName", message: nameResults });
      return;
    }

    // validate email
    const emailResults = validateEmail(email);
    if (emailResults !== true) {
      let errorMessage = "Please enter a valid email address";
      console.error(errorMessage);
      setError({ field: "email", message: errorMessage });
      return;
    }

    // validate password
    const passwordResult = validatePassword(password);
    if (passwordResult !== true) {
      console.error(passwordResult);
      setError({ field: "password", message: passwordResult });
      return;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <AuthLayout>
      <div className="signUp-page login-page">
        <h3 className="login-title">
          <strong>Create an Account</strong>
        </h3>
        <p className="login-p">Join us today by entering your details below.</p>
        <div className="profile-pic-section">
          {/* profile pic goes here */}
          <label htmlFor="profile-pic-upload" className="profile-pic-label">
            {profilePic ? (
              <>
                {" "}
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className="profile-pic-preview"
                />
              </>
            ) : (
              <div className="placeholder-circle">
                <img src={user_pic} alt="" />
              </div>
            )}{" "}
            <div
              className="upload-icon"
              onClick={profilePic ? handleDeleteProfilePic : undefined}
              style={{ background: profilePic ? "#ff4d4d" : "" }}
            >
              <img
                src={profilePic ? delete_icon : upload}
                alt={profilePic ? "Delete" : "Upload"}
              />
            </div>
          </label>
        </div>
        <input
          id="profile-pic-upload"
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="profile-pic-input"
        />

        {/* Form Begins here */}
        {/*
         */}
        {/*
         */}
        <form action="">
          <label className="label" htmlFor="">
            Full Name
          </label>
          <input
            className={`inputs ${
              error.field === "fullName" ? "error-border" : ""
            }`}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Isaac"
            required
          />
          {/*
           */}
          <label className="label" htmlFor="">
            Email Address
          </label>
          <input
            className={`inputs ${
              error.field === "email" ? "error-border" : ""
            }`}
            type="email"
            placeholder="isaac@gmail.com"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label className="label" htmlFor="">
            Password
          </label>
          <input
            className={`inputs ${
              error.field === "password" ? "error-border" : ""
            }`}
            type="password"
            placeholder="Min 8 Characters"
            required
            value={formData.password}
            name="password"
            onChange={handleChange}
          />

          {error.message && <p className="error-paragraph">{error.message}</p>}
          {/* {error.message ? <p className="error-paragraph">{error.message}</p> : null} */}

          <button className="login-btn" onClick={handleSignUp}>
            SIGN UP
          </button>
          <p className="sign-up-page">
            <strong>  
              Already have an account? <Link to="/login">Login</Link>
            </strong>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
