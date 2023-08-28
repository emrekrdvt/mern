import "./Home.css";
import Header from "../../components/header/Header";
import React, { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Siderbar from "../../components/sidebar/Siderbar";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/"+search);
      setPosts(res.data)
    };
    fetchPosts();
  }, [search]);


  return (
    <>
      <Header></Header>
      <div className="home">
        <Posts posts={posts} ></Posts>
        <Siderbar></Siderbar>
      </div>
    </>
  );
}
