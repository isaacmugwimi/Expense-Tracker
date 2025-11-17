// import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import "../../css/Login.css";
import "../../css/SignUp.css";
import { useContext, useState } from "react";
import { validateEmail, validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import UserContext from "../../context/UserContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    field: "",
    message: "",
  });
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError({ field: "", message: "" }); //clear old error
    const { email, password } = formData;

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
    // 🔹 login api call
    // ========================================
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, existingUser } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(existingUser);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
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
      <div className="login-page">
        <h3 className="login-title">
          <strong>Welcome Back</strong>
        </h3>
        <p className="login-p">Please enter your details to login</p>
        <form onSubmit={handleLogin}>
          <label className="label" htmlFor="">
            Email Address
          </label>
          <input
            type="email"
            className="inputs"
            name="email"
            placeholder="isaac@gmail.com"
            onChange={handleChange}
            // required
          />
          <label className="label" htmlFor="">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="inputs"
            placeholder="Min 8 Characters"
            onChange={handleChange}
            // required
          />
          {error.message ? (
            <p className="error-paragraph">{error.message}</p>
          ) : null}

          <button className="login-btn">Login</button>
          <p className="sign-up-page">
            <strong>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </strong>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
