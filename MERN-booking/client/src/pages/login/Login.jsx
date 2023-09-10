import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const apiUrl = process.env.REACT_APP_URL;
  const noPhoto = process.env.REACT_APP_NP;
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const hanldeClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCES", payload: res?.data });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: err.response.data });
    }
  };
  console.log(user);
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button onClick={hanldeClick} disabled={loading} className="lButton">
          Login
        </button>
        {error && (
          <span>
            =={">"} {error.message}
          </span>
        )}
      </div>
    </div>
  );
};
