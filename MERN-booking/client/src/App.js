import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";

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
]);


function App() {
  return <div className="App">
    <RouterProvider router={router}/>
  </div>;
}

export default App;
