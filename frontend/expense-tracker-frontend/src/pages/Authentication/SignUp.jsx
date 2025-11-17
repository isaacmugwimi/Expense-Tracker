import React, { useContext, useState } from "react";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import user_pic from "../../assets/profile-pics/user.svg";
import upload from "../../assets/profile-pics/upload.svg";
import delete_icon from "../../assets/profile-pics/trash-2.svg";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";
import "../../css/SignUp.css";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import UserContext from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
//
//

export default function SignUp() {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  // State to store the uploaded image
    const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
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
      setProfilePicFile(file); // store actual file for upload

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result); // base64 string for preview
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteProfilePic = (e) => {
    e.preventDefault();
    setProfilePicFile(null);
    setProfilePicPreview(null)
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError({ field: "", message: "" }); //clear old error

    let profileImageUrl = "";

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

    // ========================================
    // 🔹 Sign up api call
    // ========================================
    try {
      // upload image if present
      if (profilePicFile) {
        const imageUploadResponse = await uploadImage(profilePicFile);
        profileImageUrl = imageUploadResponse.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong try again.");
      }
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
            {profilePicPreview ? (
              
                <img
                  src={profilePicPreview}
                  alt="Profile Preview"
                  className="profile-pic-preview"
                />
              
            ) : (
              <div className="placeholder-circle">
                <img src={user_pic} alt="" />
              </div>
            )}{" "}
            <div
              className="upload-icon"
              onClick={profilePicPreview ? handleDeleteProfilePic : undefined}
              style={{ background: profilePicPreview ? "#ff4d4d" : "" }}
            >
              <img
                src={profilePicPreview ? delete_icon : upload}
                alt={profilePicPreview ? "Delete" : "Upload"}
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
        <form onSubmit={handleSignUp}>
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
