import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/blogLogo.png";
import Button from "@mui/material/Button";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";
import { signupRoute } from "../utills/APIroutes";
import { toast } from "react-toastify";


const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    age:""
  });

  useEffect(()=>{
    const setUser = async () => {
      if (localStorage.getItem("blog-app-user")) {
        navigate("/");
      }
    };
    setUser();
  },[])



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
      username: "",
    });
  };

  const validateForm = () => {
    if(user.username.length < 3){
      toast.error("Name length should be min 3",toastOptions);  
    }
    else if(!user.email.includes("@gmail.com")){
      toast.error("Email must contain @gmail.com",toastOptions);  
    }
    else if(user.password.length < 5){
      toast.error("Password Must Contain 5 letters",toastOptions);  
    }
    else{
      return true;
    }
  }

  const submitForm = async (e) => {
    e.preventDefault();
    if(validateForm()){
      const res = await axios.post(signupRoute, user);
      if (res.data.success !== false) {
        resetForm();
        toast.success("User Registered Successfully", toastOptions);
        navigate('/login')
      } else {
        toast.error("failed to signup", toastOptions);
      }
    }
  };

  return (
    <>
      <Container>
        <div className="container">
          <div className="logoSection">
            <div className="img">
              <img src={Logo} alt="logo" />
            </div>
            <span>Bloggers</span>
            <p>Register A new User</p>
          </div>

          <form onSubmit={submitForm}>
            <div className="items">
              <label htmlFor="username">Enter Your Name:</label>
              <input
                type="text"
                id="username"
                value={user.username}
                onChange={handleChange}
                name="username"
              />
            </div>

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
              <label htmlFor="email">Enter Your Age:</label>
              <input
                type="number"
                id="age"
                value={user.age}
                onChange={handleChange}
                name="age"
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
                Submit
              </Button>
              <Button variant="outlined" onClick={resetForm}>
                Reset
              </Button>
            </div>

            <p>
              Already have an Account <NavLink to="/login">Login</NavLink>{" "}
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
    grid-template-rows: 30% 70%;
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
      width: 360px;
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
        select{
          padding:4px;
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
            height: 3.5rem;
          }
        }
        p {
          font-size: 1.4rem;
        }
        span {
          font-size: 1.2rem;
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
    grid-template-rows: 20% 77%;
      width: 90%;
      .logoSection {
        .img {
          img {
            height: 3rem;
          }
        }
        p {
          font-size: 1.2rem;
        }
        span {
          font-size: 1rem;
        }
      }
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
export default Register;
