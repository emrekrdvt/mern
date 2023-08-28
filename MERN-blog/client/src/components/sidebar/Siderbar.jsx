import React, { useEffect, useState } from "react";
import "./sidebar.css";
import {  Link } from "react-router-dom";
import axios from "axios";

export default function Siderbar() {
  const [cat, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");

      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556785.jpg?w=1800&t=st=1688504613~exp=1688505213~hmac=0430ae90ca40c18c773cc0e77ebe7633906bb493e49171dc8f8fd39d3e0bd13c"
          alt=""
        />
        <p>Hello world I'm emre and this is my first mern project</p>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {cat.map((c, i) => (
              <Link className="link" key={i} to={`/?cat=${c.name}`}>
                <li className="sidebarListItem" key={i}>
                  {c.name}
                </li>
                <br></br>
              </Link>
            ))}
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">Reach me !</span>
          <div className="sidebarSocial">
            <Link
              className="link"
              to="https://www.linkedin.com/in/emrekaradavut6/"
            >
              <i className="sidebarIcon fa-brands fa-linkedin"></i>
            </Link>
            <Link className="link" to="https://github.com/emrekrdvt">
              <i className="sidebarIcon fa-brands fa-github"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
