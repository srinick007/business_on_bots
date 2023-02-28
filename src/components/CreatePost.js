import { React, useEffect, useState } from "react";
import "../styles/CreatePost.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = ({id}) => {

    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const navigate=useNavigate();

    const createPost=async()=>{

       

        const result = await axios.post(
            "https://637de434cfdbfd9a63a00317.mockapi.io/test/v2/users/"+id+"/posts",
            {  
                "Title":title,
                "content":content
               
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          alert("post added successfully");
          navigate("/posts/user");
          window.location.reload();

    }



  return (
    <div className="create-post-outer">
      <label>Title</label>
      <input
        type={"textarea"}
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        placeholder={"enter the title"}
      ></input>
       <label>Content</label>
      <textarea
        type={"text"}
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}
        placeholder={"enter the content"}
      ></textarea>
      <button id={"create-post"} onClick={createPost}>post</button>
    </div>
  );
};
export default CreatePost;
