import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Link, redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home/> : <Login/>}></Route>
        <Route path="/login" element={user ? <Home /> : <Login />}></Route>
        <Route path="/register" element={user ? <Home /> : <Register/>}></Route>
        <Route path="/messenger" element={user ? <Messenger /> : <Register/>}></Route>
        <Route path="/profile/:username" element={<Profile></Profile>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
