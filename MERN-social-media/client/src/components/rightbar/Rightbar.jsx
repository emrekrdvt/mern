import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useContext, useEffect, useState } from "react";
import { Users } from "../../../src/data";
import Online from "../online/Online";
import "./rightbar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const API = process.env.REACT_APP_API_URL;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  const [allUser, setUser] = useState([]);

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

  useEffect(() => {
    const getFriends = async () => {
      if (user && user._id) {
        try {
          const friendList = await axios.get(
            `${API}/users/friends/` + user._id
          );
          if (friendList.data) setFriends(friendList.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getFriends();
  }, [user]);
  console.log(friends);

  const handleFollowEvent = async () => {
    if (user && user?._id) {
      try {
        if (followed) {
          console.log("girdm");
          await axios.put(`${API}/users/${user?._id}/unfollow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "UNFOLLOW", payload: user?._id });
        } else {
          console.log("girdim");
          await axios.put(`${API}/users/${user?._id}/follow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "FOLLOW", payload: user?._id });
        }
      } catch (error) {
        console.log(error);
      }
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Users</h4>
        <ul className="rigtbarfriendList">
          {allUser
            .filter((u) => u._id !== currentUser._id)
            .map((filtered) => (
              <Online key={filtered._id} user={filtered}></Online>
            ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {currentUser.username !== user.username && (
          <button className="rightbarFollowButton" onClick={handleFollowEvent}>
            {followed ? "unfollow" : "follow"}
            {followed ? <PersonRemoveIcon /> : <PersonAddIcon />}
          </button>
        )}
        <h4 className="rightBarTitle"> User information </h4>
        <div className="rightBarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue"> {user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue"> {user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Reletionship: </span>
            <span className="rightbarInfoValue">
              {" "}
              {user.relationship === 1
                ? "single"
                : user.relationship === 2
                ? "Married"
                : "???"}
            </span>
          </div>
        </div>
        <h4 className="rightBarTitle"> User friends </h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={`/profile/${friend.username}`}
              className="link"
              key={friend._id}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePic
                      ? PF + friend.profilePic
                      : PF + "person/c.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightBar">
      <div className="rightbarWrapper">
        {user ? (
          <ProfileRightBar></ProfileRightBar>
        ) : (
          <HomeRightbar></HomeRightbar>
        )}
      </div>
    </div>
  );
}
