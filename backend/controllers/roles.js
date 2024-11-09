const {pool} = require('../models/db')


const createRole = async(req,res)=>{
    const {name}=req.body
    const query=`INSERT INTO roles (name) VALUES($1) RETURNING*`
    try {
        const result= await pool.query(query,[name])
        res.status(201).json({
            success: true,
            message: "Role created successfully",
            result: result.rows,
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server error`,
            error: error,
          });
    }
    

}
const createPermission = /*async*/(req,res)=>{}
const createRolePermission = /*async*/(req,res)=>{}



module.exports = {createRole , createPermission ,createRolePermission}