import { useEffect, useState } from "react";
import "./message.css";
import { format } from "timeago.js";
import axios from "axios";

export default function Message({ msg, own }) {
  const API = process.env.REACT_APP_API_URL;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState();

  useEffect(() => {
    const findUser = async () => {
      try {
        const res = await axios.get(`${API}/users?userId=${msg.sender}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    findUser();
  }, [msg]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src={user?.profilePic ? PF + user?.profilePic : PF + "person/c.png"}
          alt=""
          className={own ? "messageImg own" : "messageImg"}
        />
        <p className="messageText">{msg.text}</p>
      </div>
      <div className="messageBottom">{format(msg.createdAt)}</div>
    </div>
  );
}
