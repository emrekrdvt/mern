import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";

export default function Conversation({ conv, curUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const API = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conv.members.find((m) => m !== curUser?._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`${API}/users/?userId=${friendId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conv, curUser]);

  return (
    <>
      <div className="conversation">
        <img
          src={user?.profilePic ? PF + user?.profilePic  : PF + "person/c.png"}
          alt=""
          className="conversationImg"
        />
        <span className="conversationName">{user?.username}</span>
      </div>
    </>
  );
}
