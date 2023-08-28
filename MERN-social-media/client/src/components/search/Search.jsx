import "./search.css";

export default function Search({ user }) {
  return (
 
      <div className="userItem">
        <img src={user.profilePic} alt="" />
        <p>{user.username}</p>
      </div>

  );
}
