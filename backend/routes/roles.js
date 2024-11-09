const express = require("express");
const rolesRouter = express.Router();
const {
  createRole,
  createPermission,
  createRolePermission,
} = require("../controllers/roles");
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');


// Route to create a new role
rolesRouter.post("/role",createRole);

// Route to create a new permission
rolesRouter.post("/permissions", authentication, authorization, createPermission);

// Route to assign a permission to a role
rolesRouter.post("/role-permissions", authentication, authorization, createRolePermission);


module.exports = rolesRouter;
 

rolesRouter.post("/",createRole)
module.exports = rolesRouter;
 

/* 
{
    "name":"ِAdmin"
}
{
    "name":"User"
}
*/

