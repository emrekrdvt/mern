import React from "react";
import "./single.css";
import Siderbar from "../../components/sidebar/Siderbar";
import SinglePost from "../../components/singlePost/SinglePost";

export default function Single() {
  return (
    <div className="single">
      <SinglePost></SinglePost>
      <Siderbar></Siderbar>
    </div>
  );
}
