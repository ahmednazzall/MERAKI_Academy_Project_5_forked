import "./App.css";
import Login from "./components/login/Login";

import { Route, Routes, useRoutes } from "react-router-dom";
import Register from "./components/register/Register";
import Home from "./components/dashboard/Home";
import Profile from "./components/profile/Profile";
import Forget from "./components/forgetPassword/Forget";
import Posts from "./components/posts/Posts";
import { useState } from "react";
import Comments from "./components/comments/Comments";

import Explore from "./components/explore/explore";

import SearchBar from "./components/search/Search";

import Followers from "./components/profile/Followers";
import NextStep from "./components/forgetPassword/NextStep";
import SavedPost from "./components/saved Post/savedPost";
import Edit from "./components/profile/Edit";
import AdminDashBoard from "./components/AdminPanel/AdminDashBoard/AdminDashBoard";
import AdminUsers from "./components/AdminPanel/AdminUsers/AdminUsers";
import AdminPosts from "./components/AdminPanel/AdminPosts/AdminPosts";
import AdminReports from "./components/AdminPanel/AdminReports/AdminReports";

function App() {
  const themes = ["light", "dark", "blue", "green"];
  const [theme, setTheme] = useState("light");

  const toggleTheme = (e) => {
    setTheme(e.target.value);
  };

  let element = useRoutes([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "forget",
          element: <Forget />,
          children: [
            {
              path: "claim/",
              element: <NextStep />,
            },
          ],
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
          path: "",
          element: <Posts />,
        },
        {
          path: "profile/:id",
          element: <Profile />,
        },
        {
          path:"/home/profile/edit",
          element:<Edit/>
        },
    
        {
          path: "/home/profile/f/:id",
          element: <Followers />,
        },
        {
          path: "/home/comments/:id",
          element: <Comments />,
        },
        {
          path: "/home/explore",
          element: <Explore />,
        },
        {
          path: "/home/search",
          element: <SearchBar />,
        },
        {
          path: "bookmark",
          element: <SavedPost />,
        },
      ],
    },
    {
  path : 'Admin/Panel',
  element : <AdminDashBoard />,
    },
    {path : 'Admin/Panel/users'
      ,element : <AdminUsers /> 
     },
     {path : 'Admin/Panel/posts'
      ,element : <AdminPosts /> 
     },
     {path : 'Admin/Panel/reports'
      ,element : <AdminReports /> 
     }
  ]);

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <label htmlFor="theme-select">Choose Theme: </label>
        <select id="theme-select" value={theme} onChange={toggleTheme}>
          {themes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </header>
      {element}
    </div>
  );
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
