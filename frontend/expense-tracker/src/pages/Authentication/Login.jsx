import React from 'react'
import { AuthLayout } from '../../components/layouts/AuthLayout'
import "../../css/Login.css";

export default function Login() {
  return (
    <AuthLayout>
      <div className="login-page">
        <h3 className="login-title"><strong>Welcome Back</strong></h3>
        <p className="login-p">Please enter your details to login</p>
        <form action="">
          <label className='label' htmlFor="">Email Address</label>
          <input type="email"  className='inputs' placeholder='isaac@gmail.com' required />
          <label className='label' htmlFor="">Password</label>
          <input type="password" className='inputs' placeholder='Min 8 Characters' required />
          <button className="login-btn">Login</button>
          <p className='sign-up-page'><strong>Don't have an account? <a href="#" target="_blank">Sign Up</a></strong></p>
        </form>
      </div>
    </AuthLayout>
  )
}
