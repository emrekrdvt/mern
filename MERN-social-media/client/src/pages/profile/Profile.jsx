import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

import "./profile.css";

export default function Profile() {
  const API = process.env.REACT_APP_API_URL;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${API}/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const updateCover = async () => {
      if (coverPic) {
        const data = new FormData();
        const fileName =
          username + "cover" + "." + coverPic.name.split(".").pop();
        data.append("name", fileName);
        data.append("file", coverPic);
        const updateUser = {
          userId: user._id,
          coverPic: fileName,
        };
        try {
          await axios.post(`${API}/upload`, data);
          await axios.put(`${API}/users/${user._id}`, updateUser);
        } catch (error) {
          console.log(error);
        }
      }
    };
    updateCover();
  }, [coverPic]);

  useEffect(() => {
    const updateProfilePic = async () => {
      if (profilePic) {
        const data = new FormData();
        const fileName =
          username + "profile" + "." + profilePic.name.split(".").pop();
        data.append("name", fileName);
        data.append("file", profilePic);
        const updateUser = {
          userId: user._id,
          profilePic: fileName,
        };
        try {
          await axios.post(`${API}/upload`, data);
          await axios.put(`${API}/users/${user._id}`, updateUser);
        } catch (error) {
          console.log(error);
        }
      }
    };
    updateProfilePic()
  }, [profilePic]);

  return (
    <>
      <Topbar></Topbar>
      <div className="profile">
        <Sidebar></Sidebar>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <label htmlFor="file">
                <img
                  src={user.coverPic ? PF + user.coverPic : PF + "person/c.png"}
                  alt=""
                  className="profileCoverImg"
                />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setCoverPic(e.target.files[0])}
                ></input>
              </label>
              <label htmlFor="profFile">
              <img
                src={
                  user.profilePic ? PF + user.profilePic : PF + "person/c.png"
                }
                alt=""
                className="profileUserImg"
              />
              <input
                  style={{display: "none"}}
                  type="file"
                  id="profFile"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                ></input>
              </label>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <h2 className="profileInfoDesc">{user.desc}</h2>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}></Feed>
            <Rightbar user={user}></Rightbar>
          </div>
        </div>
      </div>
    </>
  );
}
