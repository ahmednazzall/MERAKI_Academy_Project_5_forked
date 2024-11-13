import React , {useEffect} from 'react'
import './posts.css'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { setPosts } from '../redux/reducers/slicePosts'
const Posts = () => {
  const token = localStorage.getItem('token')
  const dispatch=useDispatch()
  const posts = useSelector(posts=>{
    return posts.posts.posts
  })
  
  
  
  useEffect(() => {
    axios.get('http://localhost:5000/posts',{
      headers: { Authorization: token }
    }).then((res)=>{
      
      
      dispatch(setPosts(res.data.Posts))
     
      
    })
  },[posts]);
  return (
    <div>
      {posts?.map((elem,ind)=>{
        return <div>
          
          {/* just for test */}
          {elem.profileimage ? <img src={elem.profileimage} /> :null}
        <h3>{elem.username}</h3>
        <p>{elem.body}</p>
        
        </div>
      })}
    </div>
  )
}

export default Posts