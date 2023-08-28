import React from "react";
import './header.css'

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">react & node</span>
        <span className="headerTitleLr">blog</span>
      </div>
      <img
        className="headerImg"
        src="https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556785.jpg?w=1800&t=st=1688504613~exp=1688505213~hmac=0430ae90ca40c18c773cc0e77ebe7633906bb493e49171dc8f8fd39d3e0bd13c"
        alt=""
      />
    </div>
  );
}
