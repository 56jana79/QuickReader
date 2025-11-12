import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormDataContext } from "../Context/FormDataContext";
import "./register.css";

const Register = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false);
  const navigate = useNavigate();

  const isUpper = /[A-Z]/.test(formData.password);
  const isNumber = /\d/.test(formData.password);
  const isSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const isValidPassword = isUpper && isNumber && isSymbol;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmittedOnce(true);

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!isValidPassword) {
      alert('Password does not meet required constraints');
      return;
    }

    const isEmpty = Object.values(formData).some(
      (field) => field === '' || field === false
    );
    if (isEmpty) return;

    setSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="register-wrapper">
      <div className="form-panel only-form">
        <h2>Register</h2>
        <p>Create your account. It's free and only takes a minute</p>

        {submitted ? (
          <div className="alert-success">
            Registered Successfully! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
                className={isSubmittedOnce && !formData.username ? 'input-error' : ''}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                maxLength="10"
                pattern="[0-9]{10}"
                onChange={handleChange}
                className={isSubmittedOnce && !formData.phone ? 'input-error' : ''}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={isSubmittedOnce && !formData.email ? 'input-error' : ''}
            />

            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={isSubmittedOnce && !formData.password ? 'input-error' : ''}
              />
              <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>  

            <div className="password-constraints">
              <p className={isUpper ? 'valid' : ''}>• At least one uppercase letter</p>
              <p className={isNumber ? 'valid' : ''}>• At least one number</p>
              <p className={isSymbol ? 'valid' : ''}>• At least one special character</p>
            </div>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={isSubmittedOnce && !formData.confirmPassword ? 'input-error' : ''}
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={isSubmittedOnce && !formData.role ? 'input-error' : ''}
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Graduate">Graduate</option>
              <option value="Working Professional">Working Professional</option>
            </select>

            <div className="checkbox-group">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
              />
              <label>
                I accept the <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="register-btn">
              Register Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
