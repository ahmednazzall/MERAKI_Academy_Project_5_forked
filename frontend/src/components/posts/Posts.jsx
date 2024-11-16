import React, { useEffect , useState } from "react";
import "./posts.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../comments/Comments";
import { setPosts } from "../redux/reducers/slicePosts";
import { useNavigate } from "react-router-dom";
import SearchBar from "../search/Search";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
const Posts = () => {
  const [addPost , setaddPost] = useState({})
  const postInfo = {image : addPost.image||null , body : addPost.body|| null ,video:addPost.video||null  }
  const navigate = useNavigate();

  
  
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const posts = useSelector((posts) => {
    return posts.posts.posts;
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setPosts(res.data.Posts));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [posts]);
  return (
    <div>
       <Input placeholder="Search" allowClear='true' className='search-input' onPressEnter={(e)=>{
      navigate('./search')
    }}/>
    <SearchOutlined className="Search-Button" onClick={()=>{
      navigate('./search')
    }}/>
      <div className="createPost">
        <input placeholder="whats on your mind?" onChange={(e)=>{
          setaddPost({...addPost , body: e.target.value})
        }}/>
        <button type="submit" onClick={(e)=>{
          axios
          .post('http://localhost:5000/posts',postInfo,{
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
        }}>post</button>
      </div>
      {posts?.map((elem, ind) => {
        return (
          <div key={ind} className="post">
         
            {/* just for test */}
            {elem.profile_image ? (
              <img src={elem.profile_image} className="profPic" />
            ) : null}
            <div className="innerPost">
              <h3>{elem.user_name}</h3>
              <p>{elem.body}</p>
              <div className="btn">
                <button>share</button>
                <button onClick={(e)=>{
                  localStorage.setItem('postId',elem.post_id)
                  navigate('./comments')
                }}>comments</button>
                <button>like</button>
                
              </div>
            </div>
          </div>
        );
      })}
      <FloatButton className="float-Button"
      icon={<QuestionCircleOutlined />}
      type="primary"
     
    />
    </div>
  );
};

export default Posts;
