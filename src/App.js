import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "./userContext";
import CreatePost from './Pages/CreatePost'
import ViewPost from "./Components/ViewPost";
import EditPost from "./Components/EditPost";
import MyBlogs from "./Pages/MyBlogs";
const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<ViewPost />} />
            <Route path="/editpost" element={<EditPost />} />
            <Route path="/myblogs" element={<MyBlogs />} />
          </Route>
        </Routes>
        <ToastContainer />
      </UserContextProvider>
    </>
  );
};

export default App;
