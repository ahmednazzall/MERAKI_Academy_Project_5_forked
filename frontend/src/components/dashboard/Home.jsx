import React, { useEffect, useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Side from "./Side";
import Search from "../search/Search";
import { SearchOutlined } from "@ant-design/icons"; // استيراد أيقونة البحث

const Home = () => {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // حالة لحفظ النص المدخل
  const [isSearching, setIsSearching] = useState(false); // حالة لتحديد إذا كان يتم البحث

  const isLoggedIn = useSelector((auth) => {
    return auth.auth.isLoggedIn;
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  // وظيفة تنفيذ البحث
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("Please enter a search term."); // تحذير في حال كان الحقل فارغًا
      return;
    }
    setIsSearching(true); // بدء البحث
  };

  return (
    <div className="parent">
      <div className="nav">
        <img src="../../Preview.png" className="MoltaqaIcon" alt="Logo" />

        <div className="search-bar">
          {/* حقل إدخال النص للبحث */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // تحديث النص المدخل
          />

          {/* زر أيقونة البحث */}
          <button
            onClick={handleSearch} // ربط الزر بوظيفة البحث
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            <SearchOutlined
              style={{
                fontSize: "20px",
                color: "#1890ff",
              }}
            />
          </button>
        </div>
      </div>

      <div className="org">
        <Side />

        {isSearching && <Search token={token} searchTerm={searchTerm} />}
        <Outlet />
      </div>

      <div className="messages">messages here</div>
    </div>
  );
};

export default Home;
