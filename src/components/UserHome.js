import { React, useEffect, useState } from "react";
import axios from "axios";
import Post from "./PostCard";
import { useNavigate } from "react-router-dom";
import "../styles/UserHome.css";
import CreatePost from "./CreatePost";

const UserHome = () => {
  const [posts, setPosts] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const navigate = useNavigate();
  const id = localStorage.getItem("userid");
  const username = localStorage.getItem("username");

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "https://637de434cfdbfd9a63a00317.mockapi.io/test/v2/users/" +
          id +
          "/posts"
      );
      setPosts(result.data);
    }
    fetchData();
  }, []);

  const post = posts.map((element) => {
    return <Post data={element}></Post>;
  });

  return (
    <div style={{
      width:"100%",
    }}>
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

      <button
        id="create"
        onClick={() => {
          setOverlay(!overlay);
        }}
      >
        Create
      </button>

      {overlay && (
        <div
          className="backdrop"
          onClick={() => {
            setOverlay(!overlay);
          }}
        ></div>
      )}
      {overlay && <CreatePost id={id}></CreatePost>}
      {post.length==0 && (<p style={{"fontSize":"20px","color":"white",position:"absolute",top:"50%","left":"30%",transform:"translate(-50%,-50%)"}}>no post available</p>)}

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
        <div  style={{display:"block",width:"70%"}}>{post}</div>

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

export default UserHome;
