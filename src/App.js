import {React,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from './components/Posts';
import UserHome from './components/UserHome';

function App() {
  const [user_id, setUserId] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home setUserId={setUserId}/>} />
        <Route path="/posts" element={<Posts id={user_id}/>} />
        <Route path="/posts/user" element={<UserHome/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
