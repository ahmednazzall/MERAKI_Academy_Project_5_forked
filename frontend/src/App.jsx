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
         path:'/home',
          element: <Posts />,
        },
        {
          path: "/home/profile",
          element: <Profile />,
        },

        {
          path:'/home/comments',
          element:<Comments/>
        }
      ],
    },
  ]);
  console.log(element);

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
