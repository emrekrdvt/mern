import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import TopBar from "./components/topbar/TopBar";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context)
  return (
    <BrowserRouter>
      <TopBar> </TopBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register" element={user ?<Home></Home>:  <Register></Register>}></Route>
        <Route path="/login" element={user ?<Home></Home> : <Login></Login>}></Route>
        <Route path="/write" element={user ? <Write></Write> : <Login></Login>}></Route>
        <Route path="/settings" element={user ? <Settings></Settings> : <Login></Login>}></Route>
        <Route path="/post/:postId" element={<Single></Single>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
