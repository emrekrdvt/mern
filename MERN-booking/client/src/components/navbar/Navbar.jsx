import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export default function Navbar() {
  const { user} = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
         <Link to={"/"} className="link">
          <span className="logo">FCF</span>
        </Link>
          {user ?  user.username : <div className="navItems">
            <button className="navButton">Register</button>
            <Link className="link" to={"/login"}>
            <button className="navButton">Login</button>
            </Link>
          </div>}
      </div>
    </div>
  );
}
