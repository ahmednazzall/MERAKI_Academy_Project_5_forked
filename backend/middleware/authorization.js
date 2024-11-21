const { pool } = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const role_id = req.token.role_id;
    
    const query = `SELECT * FROM rolePermissions INNER JOIN Permissions ON rolePermissions.permission_id = Permissions.Permission_id WHERE rolePermissions.role_id =$1 AND Permissions.permission =$2 `;
    pool
      .query(query, [role_id, string])
      .then((result) => {
        if (result.rows.length) {
          next();
        } else {
          res.status(400).json({ message: "Unauthorized" });
          console.log("Error From Authorization");
          throw Error;
        }
      })
      .catch((err) => {
        res.status(400).json({ message: "Error" });
      });
  };
};

module.exports = authorization;
