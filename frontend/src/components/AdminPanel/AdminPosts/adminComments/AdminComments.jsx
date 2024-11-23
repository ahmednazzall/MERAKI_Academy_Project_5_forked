import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteComment,
  setComments,
} from "../../../redux/reducers/sliceComments";
import axios from "axios";
import "./adminComment.css";
import { Avatar, Button } from "antd";

const AdminComments = ({ id, setIsVisible }) => {
    const navigate=useNavigate()
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
    const { postId } = useParams();
  const comments = useSelector((reducers) => {
    return reducers.comments.comments;
  });

  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments/${postId}/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {        
        dispatch(setComments(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`http://localhost:5000/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(deleteComment(commentId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  return (
    <div className="popup">
    <div className="popContent">
      <button
        className="btnComment"
        onClick={() => {
          setIsVisible(false);
          navigate("../posts")
          dispatch(setComments([]));
        }}
      >
        X
      </button>
      {comments?.map((comment) => {
        return (
          <div key={comment.comment_id} className="parentComment">
            <div className="commentHeader">
              <Avatar src={comment.profile_image} />
              <p>{comment.user_name}</p>
            </div>
            <div className="CommentBody">
              <p>{comment.comment}</p>
            </div>
            <Button
              onClick={() => {
                handleDeleteComment(comment.comment_id);
              }}
            >
              delete
            </Button>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default AdminComments;
