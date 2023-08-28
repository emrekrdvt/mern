import { useEffect, useState } from "react";
import "./chatonline.css";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function ChatOnline({ onlineUser, meId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriend, setOnineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`${API}/users/friends/${meId}`);
        setFriends(res.data);
      } catch (error) {}
    };
    getFriends();
  }, [meId]);

  useEffect(() => {
    try {
      setOnineFriends(friends.filter((f) => onlineUser.includes(f._id)));
    } catch (error) {}
  }, [friends, onlineUser]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`${API}/conv/find/${meId}/${user._id}`);
      setCurrentChat(res.data);
    } catch (error) {}
  };

  return (
    <div className="chatOnline">
      {onlineFriend.map((o) => (
        <div
          className="chatOnlineFriend"
          key={o._id}
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={o.profilePic ? PF + o.profilePic : PF + "person/c.png"}
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}{" "}
    </div>
  );
}
