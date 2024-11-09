const { pool } = require("../models/db");
const createPost = async (req, res) => {
  const { body, image, video } = req.body;
  const  user_id  = req.token.userId;

  
  const query = `INSERT INTO POSTS (body , image , video , user_id) VALUES ($1,$2,$3,$4)`;
  const data = [body, image, video, user_id];
  pool
    .query(query, data)
    .then((result) => {
        res.status(201).json({
            success : true ,
            message :'Post Created Successfully'
        })
    })
    .catch((error) => {
        console.log(error);
        
        res.status(500).json({
             success : false ,
             message :'error',
             err : error
        })
    });
};

const getAllPosts = /*async*/ (req, res) => {};

const getPostById = /*async*/ (req, res) => {};

const getPostByUser = /*async*/ (req, res) => {};

const updatePostById = /*async*/ (req, res) => {};

const deletePostById = /*async*/ (req, res) => {};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostByUser,
  updatePostById,
  deletePostById,
};
