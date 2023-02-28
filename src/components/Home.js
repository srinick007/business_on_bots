import { React, useEffect, useState } from "react";
import axios from "axios";
import Usercard from "./Usercard";
import "../styles/Home.css";
import img from "./asserts/bg.webp";
import Posts from "./Posts";
import { useNavigate } from "react-router-dom";

const Home = ({ setUserId }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    async function fetchData() {
      //API USED->https://jsonplaceholder.typicode.com/users
      const result = await axios.get(
        "https://637de434cfdbfd9a63a00317.mockapi.io/test/v2/users"
      );

      setUsers(result.data);
    }
    fetchData();
  }, []);

  const user_list = users.map((element) => {
    return (
      <Usercard
        data={element}
        id={element.id}
        change_user={setUserId}
      ></Usercard>
    );
  });

  return (
    <div className="user-list-outer">
      <button
        id="logout"
        onClick={() => {
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          navigate("/");
        }}
      >
        Logout
      </button>
      <div
        style={{
          display: "flex",
          padding: "20px 0px",
          backgroundImage:
            "url(https://demos.creative-tim.com/vision-ui-dashboard-chakra/static/media/background-body-admin.9a5703c1.png)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          paddingTop: "90px",
          width:"100%",
        }}
      >
      <div className="user-list-inner">{user_list}</div>
      <div className="usernameAdmin">
          <h1>Welcome back!</h1>
          <p>
            Nice to see you , <span className="usernamespan">{username}</span>
          </p>
        </div>

      </div>
      
      
    </div>
  );
};

export default Home;
