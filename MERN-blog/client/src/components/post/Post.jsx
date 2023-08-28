import React from "react";
import "./post.css";
import {  Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "https://mern-blog-app-9uwr.onrender.com/images/"
  return (
    <div className="post">
      {post.photo ? <img className="postImg" src={PF + post.photo} alt="" /> : <img className="postImg" src="https://marketplace.canva.com/EAFltPVX5QA/1/0/1600w/canva-cute-cartoon-anime-girl-avatar-ZHBl2NicxII.jpg" alt="" /> }
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, i) => (
            <span className="postCats" key={i}>
              {c.name}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc} </p>
    </div>
  );
}
