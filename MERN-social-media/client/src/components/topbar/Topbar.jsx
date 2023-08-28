import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Topbar() {
  const API = process.env.REACT_APP_API_URL;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);
  const [allUser, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const findUser = useRef();

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const allUser = await axios.get(`${API}/users/alluser`);
        setUser(allUser.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUser();
  }, []);

  const handleSearch = (searchText) => {
    const filtered = allUser.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleInput = () => {
    const searchText = findUser.current.value;
    if (searchText === "") setFilteredUsers([]);
    else handleSearch(searchText);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={"/"} className="link">
          <span className="logo">FakeBook</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search anything"
            className="searchInput"
            ref={findUser}
            onChange={handleInput}
          />
        </div>
        <div className="userList">
          <ul>
            {filteredUsers.map((u) => (
              <Link to={`/profile/${u.username}`} className="link">
                <li key={u._id} className="userItem">
                  <img
                    src={u.profilePic ? PF + u.profilePic : PF + "person/c.png"}
                    alt=""
                  />
                  <p>{u.username}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLink">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">TimeLine</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon></PersonIcon>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to={"/messenger"} className="link">
              <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
              <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon></NotificationsIcon>
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        <Link to={`/profile/${user?.username}`}>
          <img
            src={user.profilePic ? PF + user.profilePic : PF + "person/c.png"}
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
