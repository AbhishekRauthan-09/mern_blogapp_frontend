import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../Components/Post";
import axios from "axios";
import { getallposts } from "../utills/APIroutes";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(() => {
    const getAllPosts = async () => {
      const data = await axios.get(getallposts);
      setPosts(data.data);
    };
    getAllPosts();
  }, []);
  if(!userInfo.id){
    navigate('/login')
  }
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

export default Home;
