import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import anath from "../assets/Ananths.png";
import q from "../assets/quick.png"
import "./Login.css";
import { FormDataContext } from "../Context/FormDataContext";

const Login = () => {
  const { formData } = useContext(FormDataContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const handleLogin = () => {
    setTouched({ username: true, password: true });

    if (!loginData.username || !loginData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (
      loginData.username === formData.username &&
      loginData.password === formData.password
    ) {
      setError('');
      navigate('/Test');
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src={q} alt="Login Visual" className="login-image" />
      </div>

      <div className="login-form-wrapper">
        <h2 className="mb-4 text-center fw-bold">Login</h2>

        <div className="input-group mb-3">
          <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
          <input
            type="text"
            className={`form-control ${touched.username && !loginData.username ? 'is-invalid' : ''}`}
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
          <input
            type="password"
            className={`form-control ${touched.password && !loginData.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
        </div>

        {error && <p className="text-danger text-center">{error}</p>}

        <button className="loginbtn1" onClick={handleLogin}>
          Login
        </button>

        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
