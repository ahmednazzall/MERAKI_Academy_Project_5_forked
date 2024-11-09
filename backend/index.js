const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const pool = require('./models/db')
const rolesRouter = require('./routes/roles')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')
const followersRouter = require('./routes/comments')
app.use(express.json())
app.use('/roles' , rolesRouter)
app.use('/users' , usersRouter)
app.use('/posts' , postsRouter)
app.use('/comments' , commentsRouter)
app.use('/followers' , followersRouter)

app.listen(PORT ,()=>{
    console.log(`Server Listening At PORT ${PORT}`);
      
}) 