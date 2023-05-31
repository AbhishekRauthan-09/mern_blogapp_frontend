import React, { useContext, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/blogLogo.png";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../utills/APIroutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

const Login = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
  };

  const resetForm = () => {
    setUser({
      email: "",
      password: "",
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const res = await axios.post(loginRoute, user, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    });
    if (res.data.success !== false) {
      toast.success("User found with these credentials", toastOptions);

      const getUserData = async () => {
        const data = await res.data;
        setUserInfo(data);
      };
      getUserData();
      resetForm();
      navigate("/");
    } else {
      toast.error(res.data.msg, toastOptions);
    }
  };

  if(userInfo?.id){
    navigate('/')
  }

  return (
    <>
      <Container>
        <div className="container">
          <div className="logoSection">
            <div className="img">
              <img src={Logo} alt="logo" />
            </div>
            <span>Bloggers</span>
            <p>Login to the website</p>
          </div>

          <form onSubmit={submitForm}>
            <div className="items">
              <label htmlFor="email">Enter Your email:</label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={handleChange}
                name="email"
              />
            </div>

            <div className="items">
              <label htmlFor="password">Enter password:</label>
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                name="password"
              />
            </div>

            <div className="btns">
              <Button variant="contained" type="submit">
                Login
              </Button>
              <Button variant="outlined" onClick={resetForm}>
                Reset
              </Button>
            </div>

            <p>
              Don't Have an Account <NavLink to="/register">Register</NavLink>{" "}
            </p>
          </form>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    box-shadow: 1px 3px 13px #2d235847;
    display: grid;
    grid-template-rows: 35% 60%;
    justify-content: center;
    align-items: center;
    padding: 18px 30px;
    min-height: 60vh;
    width: auto;
    .logoSection {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

      .img {
        img {
          height: 5rem;
        }
      }
      p {
        font-size: 1.8rem;
      }
      span {
        font-size: 1.4rem;
        font-weight: bold;
      }
    }

    form {
      margin-top: 30px;
      height: 100%;
      width: 350px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;

      .items {
        label {
          font-size: 0.9rem;
        }
        input {
          margin-top: 5px;
          width: 90%;
          padding: 10px 8px;
          color: #000;
          border-radius: 2px;
          outline: none;
          border: 1px solid #000;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
        }
      }

      .btns {
        button {
          margin: 0 10px;
        }
      }

      p {
        margin-top: 12px;
        a {
          color: #0360e2;
          font-weight: 500;
          text-decoration: none;
        }
      }
    }
    @media (max-width:500px){
      grid-template-rows: 25% 75%;
        width: 80%;
        .logoSection {
          .img {
            img {
              height: 5rem;
            }
          }
          p {
            font-size: 1.5rem;
          }
          span {
            font-size: 1.3rem;
          }
        }
        form{
          width: 280px;
          .items{
            width: 90%;
            input{
              width: 100%;
            }
          }
        }
      }
      @media (max-width:390px){
        width: 90%;
        form{
          width: 270px;
          .items{
            width: 85%;
            label{
              font-size:.9rem;
            }
            input{
              width: 100%;
              padding: 5px 8px;
            }
          }
          .btns {
            button {
              margin: 0 7px;
              padding: 4px 5px;
              font-size:1rem;
            }
          }
        }
      }
  }
`;
export default Login;
