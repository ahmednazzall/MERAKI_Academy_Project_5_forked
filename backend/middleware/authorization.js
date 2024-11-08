const { pool } = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const role_id = req.token.role;
    const query = `SELECT * FROM rolePermissions INNER JOIN Permissions ON rolePermissions.permission_id = Permissions.Permission_id WHERE rolePermissions.role_id = ($1) AND Permissions.Permission = ($2)`;
    pool
      .query(query, [role_id, string])
      .then((result) => {
        if (result.rows.length) {
          next();
        } else {
          console.log("Error From Authorization");
          throw Error;
        }
      })
      .catch((err) => {
        res.status(400).json({ message: "unauthorized" });
      });
  };
};

module.exports = authorization;
