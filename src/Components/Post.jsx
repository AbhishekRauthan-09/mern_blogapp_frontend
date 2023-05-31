import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { host } from "../utills/APIroutes";

const Post = ({ title, summary, cover, createdAt, author, _id , category}) => {
  return (
    <>
      <Container>
        
        <div className="imgBox">
        <Link to={`/post/${_id}`}>
          <img src={`${host}/${cover}`} alt="" />
          </Link>
        </div>
        <div className="post-content">
          <Link to={`/post/${_id}`}>
            <h2 className="header">{title}</h2>
          </Link>
          <div className="info">
            <p className="name-date-feild">
              <span className="author">Author: {author}</span>
              <span className="date">
                {format(new Date(createdAt), "MMM d yyyy ,HH:mm")}
              </span>
            </p>
            <p className="category">Category - {category}</p>
          </div>
          <p className="post-desc">{summary}</p>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 20px 0;
  height: 350px;
  width: 80%;
  display: grid;
  align-items: center;
  grid-template-columns: 30% 70%;
  box-shadow: 1px 3px 13px 0px #2d235847;
  padding: 10px;
  gap: 1rem;
  .imgBox {
    box-shadow: 1px 1px 4px #2d235847;
    overflow: hidden;
    height: 100%;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .post-content {
    height: 90%;
    width: 98%;
    overflow: hidden;
    h2 {
      font-size: 1.6rem;
      color: #0d0b0ec7;
    }
    .info {
      width: 100%;
      margin: 5px 0;
      color: #06050669;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .name-date-feild {
        display: flex;
        gap: 1.5rem;
      }
      .category {
        color: #2196f3;
      }
    }
    .post-desc {
      font-size: 1.2rem;
      margin-top: 10px;
      color: #06050696;
    }
  }

  &:hover {
    box-shadow: 1px 5px 20px 0px #2d235847;
  }
  a {
    text-decoration: none;
  }

  @media (max-width: 1200px) {
    height: 250px;
    overflow: hidden;
    width: 88%;
    padding: 12px;
    .imgBox {
      box-shadow: 1px 1px 4px #2d235847;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    .post-content {
      height: 90%;
      width: 98%;
      h2 {
        font-size: 1.1rem;
        color: #0d0b0ec7;
      }
      .info {
        font-size: 0.8rem;
        .name-date-feild {
          gap: 0.8rem;
        }
      }
      .post-desc {
        font-size: 1rem;
        overflow: hidden;
      }
    }
  }
  @media (max-width: 1000px) {
    grid-template-columns:40% 60%;
    .post-content {
      height: 90%;
      width: 98%;
      h2 {
        font-size: 1.5rem;
      }
      .info {
        font-size: 0.9rem;
        .name-date-feild {
          gap: 0.9rem;
        }
      }
      .post-desc {
        display:none;
      }
    }
  }
  @media (max-width: 850px) {
    height: 230px;
    .post-content {
      display:flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      h2 {
        font-size: 1.1rem;
      }
      .info {
        font-size: 0.8rem;
        .name-date-feild {
          gap: 0.4rem;
        }
      }
    }
  }
  @media (max-width: 650px) {
    height: 165px;
    width: 95%;
    padding: 8px;
    gap:.5rem;
    .post-content {
      h2 {
        font-size: 1rem;
        padding:0 4px;
        color: #0d0b0ec7;
      }
      .info {
        margin: 1px 0;
        font-size: 10px;
        .name-date-feild {
          gap: 5px;
        }
      }
    }
  }
  @media (max-width: 550px) {
    height: 135px;
    .post-content {
      h2 {
        font-size: 12px;
      }
      .info {
        font-size: 7px;
        .name-date-feild {
          gap: 5px;
        }
      }
    }
  }
  @media (max-width:400px) {
    height: 140px;
    .post-content {
      h2 {
        font-size: 12px;
      }
      .info {
        font-size: 7px;
        .name-date-feild {
          gap: 5px;
        }
      }
    }
  }
`;

export default Post;
