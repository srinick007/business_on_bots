import { React } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Usercard.css";
import axios from "axios";
import profile from "./asserts/profile.png";
import { FaTrashAlt } from "react-icons/fa";

const Usercard = ({ data, change_user, id }) => {
  const navigate = useNavigate();

  const deleteUser = async () => {
    const result = await axios.delete(
      "https://637de434cfdbfd9a63a00317.mockapi.io/test/v2/users/" + id
    );
    window.location.reload();
  };

  return (
    <div style={{position:"relative",width:"90%","margin":"auto"}}>
      <button id="post-delete" onClick={deleteUser}>
        <FaTrashAlt></FaTrashAlt>
      </button>
      <div
        className="usercard-outer"
        onClick={() => {
          change_user(id);
          navigate("/posts");
        }}
      >
        <img src={data.avatar}></img>
        <div className="usercard-inner">
          <p id="user-name">{data.name}</p>
          <p id="user-post">Total posts:{data.recent_posts.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
