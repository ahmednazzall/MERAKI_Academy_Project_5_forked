import React, { useEffect , useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "../redux/reducers/sliceComments";
import './comments.css'
import { useNavigate } from "react-router-dom";

const Comments = () => {
  const [newComment , setnewComment] = useState('')
  const posts = useSelector((reducer)=>{
    return reducer.posts.posts
  })
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const postId = localStorage.getItem('postId') || null
  const post = posts.filter((elem,ind)=>{
   
      return elem.post_id == postId
    
  })
  const dispatch = useDispatch()
  const comments = useSelector((reducers)=>{
    return reducers.comments.comments
  })
  useEffect(()=>{
    axios
    .get(`http://localhost:5000/comments/${postId}/post`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
    
      
      
      dispatch(setComments(res.data.data))
    }).catch((err)=>{
      console.log(err);
      
    })
    
  },[comments])
  
  return (
    <div>
      <div>
      {post[0].profile_image ? (
              <img src={post[0].profile_image} className="profPic" />
            ) : null}
            <div className="innerPost">
              <h3>{post[0].user_name}</h3>
              <p>{post[0].body}</p>
              
            </div>

      </div>
      {comments?.map((comment,ind)=>{
       
        
        return (<div>
          <p>{comment.comment}</p>
        </div>)
      })}
      <div>
        <input placeholder="Add Comment" onChange={(e)=>{
          setnewComment(e.target.value)
        }}/>
        <button
        onClick={(e)=>{
          axios
          .post(`http://localhost:5000/comments/${postId}`,{
            comment : newComment
          },{
            headers:{
              Authorization:`Bearer ${token}`
            }
          }).then((res)=>{

          }).catch((err)=>{
            console.log(err);
            
          })
        }}>Comment</button>
      </div>
    </div>
  )
}

export default Comments