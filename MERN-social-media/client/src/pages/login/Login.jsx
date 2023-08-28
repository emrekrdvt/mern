import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import "./login.css";
import { loginService } from "../../service/LoginService";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginService(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FakeBook</h3>
          <span className="loginDesc"> Connect to life </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="email"
              className="loginInput"
              type="email"
              required
              ref={email}
            />
            <input
              ref={password}
              placeholder="password"
              className="loginInput"
              required
              type="password"
            />
            <button className="loginButton">
              {isFetching ? (
                <CircularProgress color="success"></CircularProgress>
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot"> Forgot Password ? </span>
            <button className="loginRegisterButton">
              <Link to={"/register"} className="link">
                {isFetching ? (
                  <CircularProgress color="success"></CircularProgress>
                ) : (
                  "Create a new account"
                )}
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
