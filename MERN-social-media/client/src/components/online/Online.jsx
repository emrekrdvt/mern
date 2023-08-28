import "./online.css";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export default function Online({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src={user.profilePic ? PF+user.profilePic : PF +'person/c.png'}
          alt=""
          className="rightbarProfileImg"
        />
        {/* <span className="rightBarOnline"></span> */}
      </div>
      <div className="rightbarUsername">{user.username}</div>
    </li>
  );
}
