import { React, useEffect, useState } from "react";
import "../styles/Login.css";
import img from "./asserts/bg.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userid, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (userid == "" && password == "") {
      window.alert("please enter a valid details");
    } else {
      localStorage.setItem("userid", userid);
      localStorage.setItem("password", password);
      localStorage.setItem("username","admin1")

      if (userid == "admin1" && password == "admin1") {
        navigate("/home");
      } else {
        async function fetchData() {
          const result = await axios.get(
            "https://637de434cfdbfd9a63a00317.mockapi.io/test/v2/users/"
          );

          const user_list = result.data.map((element) => {
            return {
              id: element.id,
              name: element.name,
            };
          });

          console.log(user_list);

          for (var i = 0; i < user_list.length; i++) {
            if (userid == user_list[i].id) {
              localStorage.setItem("username",user_list[i].name)
              return true;
            }
          }

          return false;
        }

        if (await fetchData()) {
          navigate("posts/user");
        } else {
          alert("user doesnt exist, pls enter a valid user id");
        }
      }

      setPassword("");
      setUserId("");
    }
  };

  const onSubmitHandler2 = async (event) => {
    event.preventDefault();
    if (username == "") {
      window.alert("please enter a valid username");
    } else {
      console.log(username);
      const result = await axios.post(
        "https://637de434cfdbfd9a63a00317.mockapi.io/test/v2/users/",
        {
          name: username,
          avatar:
            "https://assets.leetcode.com/users/avatars/avatar_1672206514.png",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.data.id != "") {
        alert("user successfully created and your id is" + result.data.id);
      } else {
        alert("user not created");
      }
    }
  };

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }, []);

  return (
    <div className="outer-login">
      <div class="container" id="container">
        <div class="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <button onClick={onSubmitHandler2}>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>
            <input
              type="text"
              placeholder="User ID"
              value={userid}
              onChange={(event) => {
                setUserId(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button onClick={onSubmitHandler}>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button class="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
