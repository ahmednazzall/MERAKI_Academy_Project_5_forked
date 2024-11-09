
const { pool } = require("../models/db");

// Create a new role
const createRole = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO roles (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json({
      message: "Role created successfully",
      role: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create role" });
  }
};

// Create a new permission
const createPermission = async (req, res) => {
  const { permission } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Permissions (Permission) VALUES ($1) RETURNING *",
      [permission]
    );
    res.status(201).json({
      message: "Permission created successfully",
      permission: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create permission" });
  }
};

// Create a new role-permission 
const createRolePermission = async (req, res) => {
  const { role_id, permission_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO rolePermissions (role_id, permission_id) VALUES ($1, $2) RETURNING *",
      [role_id, permission_id]
    );
    res.status(201).json({
      message: "Permission assigned to role successfully",
      rolePermission: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to assign permission to role" });
  }
};
module.exports = { createRole, createPermission, createRolePermission };



