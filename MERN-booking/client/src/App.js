import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import { Login } from "./pages/login/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/hotels",
    element: <List></List>
  },
  {
    path: "/hotels/:id",
    element: <Hotel></Hotel>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
]);


function App() { 
  return <div className="App">
    <RouterProvider router={router}/>
  </div>;
}

export default App;
