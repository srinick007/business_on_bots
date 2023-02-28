import { React } from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import "../styles/PostCard.css";
import { useNavigate } from "react-router-dom";

const PostCard = ({ data }) => {
  const navigate = useNavigate();

  const deletePost = async () => {
    const result = await axios.delete(
      "https://637de434cfdbfd9a63a00317.mockapi.io/test/v2/users/" +
        data.userId +
        "/posts/" +
        data.id
    );

    if(localStorage.getItem("userid")=="admin1"){
      navigate("/home");
    }else{
      navigate("/posts/user");
      window.location.reload();
    }
    
  };

  return (
    <div className="post-outer">
      <button id="post-delete" onClick={deletePost}>
        <FaTrashAlt></FaTrashAlt>
      </button>
      <p id={"post-title"}>{data.Title}</p>
      <p id="post-body">{data.content}</p>
    </div>
  );
};

export default PostCard;
