import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/converrsations/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import "./messenger.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const API = process.env.REACT_APP_API_URL;

  const [conv, setConv] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [msg, setMsg] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const [onlineFriend, setOnlineFriend] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current?.on("getMsg", (data) => {
      setArrivalMsg({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMsg &&
      currentChat?.members.includes(arrivalMsg.sender) &&
      setMsg((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg, currentChat]);

  useEffect(() => {
    // e - y
    // o - o
    socket.current?.emit("addUser", user._id);
    socket.current?.on("getUsers", (users) => {
      setOnlineFriend(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, []);

  useEffect(() => {
    const getConv = async () => {
      try {
        const res = await axios.get(`${API}/conv/${user._id}`);
        setConv(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConv();
  }, [user._id]);

  useEffect(() => {
    const getMsg = async () => {
      try {
        if (currentChat) {
          const msg = await axios.get(`${API}/msg/${currentChat?._id}`);
          setMsg(msg.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMsg();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiMsg = {
      sender: user._id,
      text: newMsg,
      conversationID: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current?.emit("sendMsg", {
      senderId: user._id,
      receiverId,
      text: newMsg,
    });
    try {
      const res = await axios.post(`${API}/msg`, apiMsg);
      setMsg([...msg, res.data]);
      setNewMsg("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {conv.map((c)=> (
              <div onClick={() => setCurrentChat(c)} key={c._id}>
                <Conversation conv={c} curUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {msg.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message msg={m} own={m.sender == user._id}/>
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    onChange={(e) => setNewMsg(e.target.value)}
                    className="chatBoxArea"
                    placeholder="Write a something"
                    value={newMsg}
                  ></textarea>
                  <button className="chatSubmit" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversation">Open a new chat </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUser={onlineFriend}
              meId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
