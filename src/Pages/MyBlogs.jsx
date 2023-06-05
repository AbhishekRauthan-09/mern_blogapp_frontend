import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../Components/Post";
import axios from "axios";
import { myblogsRoute } from "../utills/APIroutes";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";
const MyBlogs = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const setUser = async () => {
    if (!localStorage.getItem("blog-app-user")) {
      navigate("/login");
    } else {
      const getuser = await JSON.parse(localStorage.getItem("blog-app-user"));
      console.log("in json parse");
      setCurrentUser(getuser);
      setUserInfo(getuser);
    }
  };
  useEffect(() => {
    setUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const getMyAllPosts = async () => {
        const data = await axios.get(`${myblogsRoute}/${currentUser.jwttoken}`);
        console.log("currentUser", currentUser);
        setPosts(data.data);
      };
      getMyAllPosts();
    }
  }, [currentUser]);

  return (
    <>
      <Container>
        {posts.length > 0 ? (
          posts.map((post, index) => {
            return <Post {...post} key={index} />;
          })
        ) : (
          <h1>No Blogs To Show</h1>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  .post {
  }
  h1 {
    margin-top: 150px;
  }
`;

export default MyBlogs;
