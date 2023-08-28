import "./share.css";
import CancelIcon from '@mui/icons-material/Cancel';
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const API = process.env.REACT_APP_API_URL;

  const handleShare = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(fileName);
      try {
        await axios.post(`${API}/upload`, data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post(`${API}/posts`, newPost);
      window.location.reload();
    } catch (error) {}
  };

  console.log(user.profilePic)
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user.profilePic ? PF + user.profilePic : PF + "person/c.png"}
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder="What's in your mind ?"
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"></hr>
        {file && (
          <div className="shareImgContainer">
             <img src={URL.createObjectURL(file)} className="shareImg" alt="" />
             <CancelIcon className="shareCancel" onClick={() => setFile(null)}> </CancelIcon>
          </div>
        )}
        <form className="shareBottom" onSubmit={handleShare}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon
                htmlColor="tomato"
                className="shareIcon"
              ></PermMediaIcon>
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon"></LabelIcon>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon
                htmlColor="green"
                className="shareIcon"
              ></EmojiEmotionsIcon>
              <span className="shareOptionText">Emoji</span>
            </div>
            <div className="shareOption">
              <LocationOnIcon
                htmlColor="goldenrod"
                className="shareIcon"
              ></LocationOnIcon>
              <span className="shareOptionText">Location</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
