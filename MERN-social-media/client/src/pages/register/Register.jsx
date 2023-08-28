import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const API = process.env.REACT_APP_API_URL;
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Password dont match!");
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      };
      try {
        await axios.post(`${API}/auth/register`, user);
        navigate("/login")
      } catch (error) {
        console.log(e);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">FakeBook</h3>
          <span className="registerDesc"> Connect to life </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              className="registerInput"
              required
              ref={username}
            />
            <input
              required
              placeholder="Email"
              type="email"
              className="registerInput"
              ref={email}
            />
            <input
              required
              placeholder="password"
              className="registerInput"
              type="password"
              ref={password}
              minLength="6"
            />
            <input
              required
              placeholder="password again"
              className="registerInput"
              type="password"
              minLength="6"
              ref={passwordAgain}
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <button className="registerLoginButton"> Log in </button>
          </form>
        </div>
      </div>
    </div>
  );
}
