import React, { useEffect, useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Side from "./Side";
import { SearchOutlined } from "@ant-design/icons"; // استيراد أيقونة البحث
import { Input, List, Avatar, Button, FloatButton ,message} from "antd";
import VirtualList from 'rc-virtual-list';
const fakeDataUrl =
'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";




const Home = () => {
  const [display , setdisplay] = useState(false)
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

    const handelSearch = ()=>{
      
      axios
    .get(`http://localhost:5000/users/userName/search/${searchTerm}` ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result)=>{
    
     
       setData(result.data.User)
      // dispatch(getAllUsers(result.data.Users))
      
    }).catch((err)=>{ 
      console.log(err);
      
    })  
    }


 
  // وظيفة تنفيذ البحث
  const handleSearch = () => {
    setdisplay(true)
    
    
    if (searchTerm.trim() === "") {
      alert("Please enter a search term."); // تحذير في حال كان الحقل فارغًا
      return;
    }
    setIsSearching(true); // بدء البحث
    handelSearch()

  };
  const onScroll = (e) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
      appendData();
    }
  };
  return (
    <div className="parent">
      <div className="nav" onClick={(e)=>{
        
      }}>
        <img src="../../Preview.png" className="MoltaqaIcon" alt="Logo" />

        <div className="search-bar">
          {/* حقل إدخال النص للبحث */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)

            } // تحديث النص المدخل
            />

          {/* زر أيقونة البحث */}
          <button
            // ربط الزر بوظيفة البحث
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            {!display ? <SearchOutlined
             onClick={handleSearch}
              style={{
                fontSize: "20px",
                color: "#1890ff",
              }}
            /> : <button onClick={(e)=>{
              setdisplay(false)
              setSearchTerm('')
            }}>cancel</button>}
          </button>
        </div>
      </div>
      <div className={display ? "List-Users" : 'List-Users-Non'}>
    
    
    <List >
    <VirtualList
      data={data}
      height={ContainerHeight}
      itemHeight={47}
      itemKey="email"
      onScroll={onScroll}
    >
      {(item) => (
        
        <List.Item key={item.email}>
          
          
          
          <List.Item.Meta
          
            avatar={<Avatar src={item.profile_image} />}
            title={<p onClick={(e)=>{
              navigate(`/home/profile/${item.user_id}`)
              setdisplay(false)
              setSearchTerm('')
            }} className="last_Name_Search">{item.last_name}</p>}
            description={item.user_name}
          />
         
        </List.Item>
      )}
    </VirtualList>
  </List>
   </div>
      <div className="org">
        <Side />

        
        <Outlet />
      </div>

      <div className="messages">messages here</div>
    </div>
  );
};

export default Home;
