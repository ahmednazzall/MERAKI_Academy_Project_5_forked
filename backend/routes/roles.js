const express = require("express");
const rolesRouter = express.Router();
const {
  createRole,
  createPermission,
  createRolePermission,
} = require("../controllers/roles");
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

module.exports = rolesRouter;
 