import React, { useState } from "react";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import user_pic from "../../assets/profile-pics/user.svg";
import upload from "../../assets/profile-pics/upload.svg";
import delete_icon from "../../assets/profile-pics/trash-2.svg";
import { Link } from "react-router-dom";
import "../../css/Login.css";
import "../../css/SignUp.css";
//
//
export default function SignUp() {
  // State to store the uploaded image
  const [profilePic, setProfilePic] = useState(null);

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

        <form action="">
          <label className="label" htmlFor="">
            Full Name
          </label>
          <input className="inputs" type="text" placeholder="Isaac" required />
          <label className="label" htmlFor="">
            Email Address
          </label>
          <input
            className="inputs"
            type="email"
            placeholder="isaac@gmail.com"
            required
          />
          <label className="label" htmlFor="">
            Password
          </label>
          <input
            className="inputs"
            type="password"
            placeholder="Min 8 Characters"
            required
          />
          <button className="login-btn">SIGN UP</button>
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
