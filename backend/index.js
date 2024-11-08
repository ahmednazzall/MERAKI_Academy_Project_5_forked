const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const pool = require('./models/db')
app.use(express.json())


app.listen(PORT ,()=>{
    console.log(`Server Listening At PORT ${PORT}`);
      
}) 