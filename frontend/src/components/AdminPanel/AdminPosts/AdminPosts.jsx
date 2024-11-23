import React, { useEffect ,useState} from 'react'
import './posts.css'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button } from 'antd'
import axios from 'axios'
import { deletePost, setPosts } from '../../redux/reducers/slicePosts'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminComments from './adminComments/AdminComments'
const AdminPosts = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false);

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
    
      // console.log(posts);
      
  return (
    <div className='parentPost'>
        {posts?.map((post, index) => (
          <div key={index} className="post">
            <div className='postHeader'>
            {post.profile_image ? (
              <Avatar
                src={post.profile_image}
                className="post-avatar"
                onClick={() => {
                  navigate(`/home/profile/${post.user_id}`);
                }}
              />
            ) : (
              <Avatar icon={<UserOutlined />} className="post-avatar" />
            )}

              <h3>{post.user_name}</h3>

            </div>
            <div className="postContent">
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
                  <Button onClick={()=>{
                    setIsVisible(true)
                    navigate(`./comments/${post.post_id}`)
                  }}>
                    Show comments
                  </Button>
                </div>
            
              
            </div>
            {isVisible&& <AdminComments setIsVisible={setIsVisible}/>}
          </div>
        ))}

    </div>
  )
}

export default AdminPosts