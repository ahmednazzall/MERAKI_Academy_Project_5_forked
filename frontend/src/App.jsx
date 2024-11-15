import "./App.css";
import Login from "./components/login/Login";

import { Route, Routes, useRoutes } from "react-router-dom";
import Register from "./components/register/Register";
import Home from "./components/dashboard/Home";
import Profile from "./components/profile/Profile";
import Forget from "./components/forgetPassword/Forget";
import Posts from "./components/posts/Posts";
import Comments from "./components/comments/Comments";
import Explore from "./components/explore/explore";
function App() {
  let element = useRoutes([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "/forget",
          element: <Forget />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "/home",
          element: <Posts />,
        },
        {
          path: "/home/profile",
          element: <Profile />,
        },
        {
          path: "/home/comments",
          element: <Comments />,
        },
        {
          path: "/home/explore",
          element: <Explore />,
        },
      ],
    },
  ]);

  return element;
}

export default App;
/* 

<Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/profile' element={<Profile />} />
  </Routes>
*/
