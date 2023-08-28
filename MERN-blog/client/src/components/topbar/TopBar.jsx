import React, { useContext } from "react";
import "./TopBar.css";
import {  Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "https://mern-blog-app-9uwr.onrender.com/images/";
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <Link className="link" to="https://www.youtube.com/watch?v=9CE3c0Hp7WM">
          <i className="topIcon fa-solid fa-laptop-code"></i>
        </Link>
        <Link to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="Link">

        <i className="topIcon fa-brands fa-square-twitter"></i>
        </Link>
        <Link className="link" to="https://www.youtube.com/watch?v=nUDShHyYKNI">
        <i className="topIcon fa-brands fa-youtube"></i>
        </Link>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/login" className="link">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/register" className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="searchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
