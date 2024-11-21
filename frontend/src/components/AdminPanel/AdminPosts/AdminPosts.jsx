import React, { useEffect } from 'react'
import './posts.css'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button } from 'antd'
import axios from 'axios'
import { deletePost, setPosts } from '../../redux/reducers/slicePosts'
const AdminPosts = () => {
    
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const posts = useSelector((posts)=>{
        return posts.posts.posts
    })
    useEffect(() => {
        axios.get('http://localhost:5000/posts',{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }).then((res)=>{
            dispatch(setPosts(res.data.Posts))
            
            
        }).catch((err)=>{
            console.log(err);
            
        })
       
    }, [posts]);
    const handelDelete = (postId) => {
        axios
          .delete(`http://localhost:5000/posts/${postId}/soft`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            dispatch(deletePost({ post_id: postId }));
          })
          .catch((err) => {
            console.error(err);
            console.log('"Failed to create post."');
          });
        }
          const handelHardDelete = (postId) => {
            axios
              .delete(`http://localhost:5000/posts/${postId}/hard`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
              console.log(res);
              
                dispatch(deletePost({ post_id: postId }));
              })
              .catch((err) => {
                console.error(err);
                console.log('"Failed to create post."');
              });
      };
    
  return (
    <div>
        {posts?.map((post, index) => (
          <div key={index} className="post">
            {post.profile_image ? (
              <Avatar
                src={post.profile_image}
                className="post-avatar"
                onClick={() => {
                  navigate(`./profile/${post.user_id}`);
                }}
              />
            ) : (
              <Avatar icon={<UserOutlined />} className="post-avatar" />
            )}
            <div className="post-content">
              <h3>{post.user_name}</h3>
              <p>{post.body}</p>
          
                <div className="D-Post">
                  

                  
                  <Button
                    onClick={(e) => {
                      handelDelete(post.post_id);
                    }}
                  >
                   Soft DELETE
                  </Button>
                  <Button
                    onClick={(e) => {
                      handelHardDelete(post.post_id);
                    }}
                  >
                   Hard DELETE
                  </Button>
                </div>
            
              
            </div>
          </div>
        ))}
    </div>
  )
}

export default AdminPosts