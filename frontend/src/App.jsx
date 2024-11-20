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
import GeneralSettings from "./components/setting/UpdateGeneralSettings";
import PrivacySettings from "./components/setting/UpdatePrivacySettings";
import SecuritySettings from "./components/setting/UpdateSecuritySettings";
import ContactUs from "./components/setting/ContactUs";

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
          path: "/home/profile/edit",
          element: <Edit />,
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
        // Settings Route
        {
          path: "/home/settings",
          children: [
            {
              path: "/home/settings/general",
              element: <GeneralSettings />,
            },
            {
              path: "/home/settings/privacy",
              element: <PrivacySettings />,
            },
            {
              path: "/home/settings/security",
              element: <SecuritySettings />,
            },
            {
              path: "/home/settings/contact",
              element: <ContactUs />,
            },
          ],
        },
      ],
    },
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
