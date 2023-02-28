import { React, useEffect, useState } from "react";
import axios from "axios";
import img from "./asserts/bg.webp";
import Post from "./PostCard";
import { useNavigate } from "react-router-dom";
import profile from "./asserts/profile.png";

const Posts = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (id == "") {
      navigate("/home");
    }

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

  console.log(post.length);

  return (
    <div>
      <button
        id="back"
        onClick={() => {
          navigate("/home");
        }}
      >
        back
      </button>
      <div
        style={{
          padding: "90px 0px",
          backgroundImage:
            "url(https://demos.creative-tim.com/vision-ui-dashboard-chakra/static/media/background-body-admin.9a5703c1.png)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        {post}
      </div>

      {post.length==0 && (<p style={{"fontSize":"20px","color":"white",position:"absolute",top:"50%","left":"50%",transform:"translate(-50%,-50%)"}}>no post available</p>)}
    </div>
  );
};

export default Posts;
