import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
import { profileinfoRoute, logoutRoute } from "../utills/APIroutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

const Header = () => {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    isUser();
  }, []);

  const isUser = async () => {
    const res = await axios.get(profileinfoRoute, {
      withCredentials: true,
      credentials: "include",
    });
    if (res.data.success !== false) {
      setUserInfo(res.data);
    }
  };

  const logout = () => {
    axios
      .post(
        logoutRoute,
        {},
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then(() => {
        setUserInfo(null);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const username = userInfo?.email;

  return (
    <>
      <Container>
        <div className="logo">
          <NavLink to="/">Bloggers</NavLink>
        </div>

        <div className="nav-contents">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            {username !== undefined ? (
              <>
                <li>
                  <NavLink to="/createpost">Create Post</NavLink>
                </li>
                <li>
                  <NavLink to="/myblogs">My Blogs</NavLink>
                </li>
                <li>
                  <span to="" onClick={logout}>
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </Container>
      <Outlet />
    </>
  );
};

const Container = styled.div`
  height: 66px;
  width: 100%;
  display: grid;
  grid-template-columns: 25% 75%;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #00000017;
  .logo {
    display: flex;
    justify-content: center;
    a {
      text-decoration: none;
      font-size: 1.4rem;
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  .nav-contents {
    display: flex;
    justify-content: flex-end;
    ul {
      margin-right: 40px;
      display: flex;
      li {
        list-style: none;
        margin: 0 20px;
        a,
        span {
          text-decoration: none;
          font-size: 1.2rem;
          color: #78167d;
          padding: 5px 2px;
        }
        .active {
          border-bottom: 2px solid #4c32bd;
        }
        span {
          background-color: red;
          color: #fff;
          padding: 7px 8px;
          border-radius: 5px;
          font-size: 1.1rem;
          cursor: pointer;
        }
      }
    }
  }
  @media (max-width: 768px) {
    height: auto;
    display: flex;
    flex-direction: column;
    gap:.2rem;
    padding: 10px 0;
    ul{
      margin-right:0px !important;
    }
  }
  @media (max-width: 555px) {
    gap:.2rem;
    padding: 10px 0;
    ul{
      li {
        margin: 0 7px !important;
        a,
        span {
          text-decoration: none;
          font-size: .85rem !important;
          padding: 4px 2px;
        }
        .active {
          border-bottom: 2px solid #4c32bd;
        }
        span {
          padding: 4px 5px !important;
          border-radius: 5px;
          font-size: .8rem !important;
          cursor: pointer;
        }
      }
    }
  }
  
`;

export default Header;
