const { pool } = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);
const jwt = require("jsonwebtoken");

const getHowToUse = (req, res) => {
  const howToUseContent = {
    title: "Welcome to Our Website!",
    description: "Here's how you can make the most of our platform:",
    steps: [
      "1. **Create an Account**: Register with your email and set up a secure password.",
      "2. **Customize Your Profile**: Add a bio, profile picture, and update your general settings.",
      "3. **Privacy Controls**: Manage your privacy settings, block or unblock users, and set your profile visibility.",
      "4. **Security Settings**: Enable two-factor authentication and manage active sessions for better security.",
      "5. **Explore Features**: Use our tools to connect, share, and grow within the community.",
      "6. **Contact Support**: Reach out to us for assistance via the Help section.",
    ],
  };

  res.status(200).json({
    success: true,
    message: "How to use our website",
    content: howToUseContent,
  });
};

//---------------------------------------------------------------------------------------------------------

const updateGeneralSettings = async (req, res) => {
  // Extract the token from the Authorization header
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(403).json({ message: "Token not provided" });
  }

  const token = authorization.split(" ")[1]; // Extract the token part after "Bearer"
  if (!token) {
    return res.status(403).json({ message: "Token format is incorrect" });
  }

  try {
    // Decode the JWT token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Extract settings from the request body
    const { user_name, email, password, bio, profile_image } = req.body;

    // If password is provided, hash it
    const hashedPassword = password
      ? await bcrypt.hash(password, saltRounds)
      : null;

    // Query to update general settings
    const query = `
        UPDATE users 
        SET 
          user_name = COALESCE($1, user_name),
          email = COALESCE($2, email),
          password = COALESCE($3, password),
          bio = COALESCE($4, bio),
          profile_image = COALESCE($5, profile_image)
        WHERE user_id = $6
        RETURNING *;
      `;
    const values = [
      user_name,
      email,
      hashedPassword,
      bio,
      profile_image,
      decoded.userId,
    ];

    const result = await pool.query(query, values);
    res.status(200).json({
      success: true,
      message: "General settings updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating general settings:", error);
    res.status(500).json({
      success: false,
      message: "Error updating general settings",
      error: error.message,
    });
  }
};

//---------------------------------------------------------------------------------------------------------
// تحديث إعدادات الخصوصية
const updatePrivacySettings = async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(400).json({
      success: false,
      message: "Authorization token must be provided.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const { profile_visibility, blocked_accounts, unblock_user_name } =
      req.body;

    // جلب اسم المستخدم الخاص بالمستخدم الحالي
    const userQuery = `SELECT user_name FROM users WHERE user_id = $1`;
    const userResult = await pool.query(userQuery, [decoded.userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const currentUserName = userResult.rows[0].user_name;

    // جلب قائمة الحسابات المحظورة الحالية من قاعدة البيانات
    const getBlockedQuery = `SELECT blocked_accounts FROM privacy_settings WHERE u_id = $1`;
    const result = await pool.query(getBlockedQuery, [decoded.userId]);

    const currentBlockedAccounts = result.rows[0]?.blocked_accounts
      ? result.rows[0].blocked_accounts.split(",")
      : [];

    let updatedBlockedAccounts = [...currentBlockedAccounts];

    // تحديث قائمة الحسابات المحظورة
    if (blocked_accounts && blocked_accounts.length > 0) {
      const validBlockedAccounts = [];
      for (let username of blocked_accounts) {
        // منع المستخدم من حظر نفسه
        if (username === currentUserName) {
          return res.status(400).json({
            success: false,
            message: "You cannot block yourself.",
          });
        }

        const userExistsQuery = `SELECT user_name FROM users WHERE user_name = $1`;
        const userExistsResult = await pool.query(userExistsQuery, [username]);

        if (userExistsResult.rows.length === 0) {
          return res.status(404).json({
            success: false,
            message: `The user '${username}' does not exist.`,
          });
        }

        if (!currentBlockedAccounts.includes(username)) {
          validBlockedAccounts.push(username);
        }
      }
      updatedBlockedAccounts = [
        ...new Set([...currentBlockedAccounts, ...validBlockedAccounts]),
      ];
    }

    // إلغاء حظر المستخدم
    if (unblock_user_name) {
      const userExistsQuery = `SELECT user_name FROM users WHERE user_name = $1`;
      const userExistsResult = await pool.query(userExistsQuery, [
        unblock_user_name,
      ]);

      if (userExistsResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `The user '${unblock_user_name}' does not exist.`,
        });
      }

      if (!currentBlockedAccounts.includes(unblock_user_name)) {
        return res.status(404).json({
          success: false,
          message: `The user '${unblock_user_name}' is not currently blocked.`,
        });
      }

      updatedBlockedAccounts = updatedBlockedAccounts.filter(
        (username) => username !== unblock_user_name
      );
    }

    // تحديث البيانات في قاعدة البيانات
    const queryUpdate = `
      INSERT INTO privacy_settings (u_id, profile_visibility, blocked_accounts)
      VALUES ($1, $2, $3)
      ON CONFLICT (u_id)
      DO UPDATE SET 
        profile_visibility = COALESCE(EXCLUDED.profile_visibility, privacy_settings.profile_visibility),
        blocked_accounts = EXCLUDED.blocked_accounts
      RETURNING *;
    `;
    const values = [
      decoded.userId,
      profile_visibility || null, // إذا لم يتم توفير قيمة، اترك الحقل كما هو
      updatedBlockedAccounts.length > 0
        ? updatedBlockedAccounts.join(",")
        : null,
    ];

    const resultPrivacy = await pool.query(queryUpdate, values);

    res.status(200).json({
      success: true,
      message: "Privacy settings updated successfully.",
      privacySettings: resultPrivacy.rows[0],
    });
  } catch (error) {
    console.error("Error updating privacy settings:", error);
    res.status(500).json({
      success: false,
      message: "Error updating privacy settings.",
      error: error.message,
    });
  }
};

const getPrivacySettings = async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(400).json({
      success: false,
      message: "Authorization token must be provided.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    // Log user ID for debugging
    console.log("User ID:", decoded.userId);

    // Check if decoded.userId exists
    if (!decoded.userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing from the token.",
      });
    }

    // Query privacy settings
    const query = `SELECT * FROM privacy_settings WHERE u_id = $1`;
    const result = await pool.query(query, [decoded.userId]);

    if (result.rows.length === 0) {
      // If privacy settings do not exist, create them with default values
      const insertQuery = `
        INSERT INTO privacy_settings (u_id, profile_visibility, blocked_accounts)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const defaultSettings = await pool.query(insertQuery, [
        decoded.userId, // Ensure valid user ID here
        "public", // Default visibility
        null, // No blocked accounts initially
      ]);

      return res.status(200).json({
        success: true,
        privacySettings: {
          profile_visibility: defaultSettings.rows[0].profile_visibility,
          blocked_accounts: [],
        },
      });
    }

    const blockedAccounts = result.rows[0]?.blocked_accounts
      ? result.rows[0].blocked_accounts.split(",")
      : [];

    res.status(200).json({
      success: true,
      privacySettings: {
        profile_visibility: result.rows[0].profile_visibility,
        blocked_accounts: blockedAccounts,
      },
    });
  } catch (error) {
    console.error("Error fetching privacy settings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching privacy settings.",
      error: error.message,
    });
  }
};

//---------------------------------------------------------------------------------------------------------

const updateSecuritySettings = async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(400).json({
      success: false,
      message: "Authorization token must be provided.",
    });
  }

  const token = authorizationHeader.split(" ")[1];
  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.SECRET); 

    // Extract the parameters from the body
    const { two_factor_auth, active_sessions } = req.body;

    // SQL query to insert or update the security settings
    const query = `
        INSERT INTO security_settings (userid, two_factor_auth, active_sessions)
        VALUES ($1, $2, $3)
        ON CONFLICT (userid)
        DO UPDATE SET 
          two_factor_auth = COALESCE($2, security_settings.two_factor_auth),
          active_sessions = COALESCE($3, security_settings.active_sessions)
        RETURNING *;
      `;

    // Values to be passed to the query
    const values = [
      decoded.userId,
      two_factor_auth,
      JSON.stringify(active_sessions),
    ];

    // Execute the query
    const result = await pool.query(query, values);

    // Send success response
    res.status(200).json({
      success: true,
      message: "Security settings updated",
      securitySettings: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating security settings:", error);
    res.status(500).json({
      success: false,
      message: "Error updating security settings",
      error: error.message,
    });
  }
};

//---------------------------------------------------------------------------------------------------------

// retrieving contact information
const getContactUs = (req, res) => {
  const contactInfo = {
    Email: {
      Serren_Email: "sereenesam@gmail.com",
      Ahmad_Email: "nazzall.ahmed@gmail.com",
      Abdulelah_Email: "abdalelahaljamal@gmail.com",
    },
    Phone_Number: {
      Serren_phone: "0539457475",
      Ahmad_phone: "0798546036",
      Abdulelah_phone: "0775532898",
    },
  };

  res.status(200).json({
    success: true,
    message: "Contact information retrieved successfully",
    contactInfo,
  });
};

//---------------------------------------------------------------------------------------------------------

const postContactUs = async (req, res) => {
  const { message, email } = req.body;

  if (!message || !email) {
    return res.status(400).json({
      success: false,
      message: "All fields (email,  message) are required.",
    });
  }

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization token must be provided.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const personId = decoded.userId;

    const userQuery = `SELECT * FROM users WHERE email = $1 AND is_deleted = 0`;
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "User not found. Please ensure the email is correct and registered.",
      });
    }

    const query = `
      INSERT INTO contact_us (person_id, email, message, submitted_at)
      VALUES ($1, $2, $3,  NOW())
      RETURNING *;
    `;
    const values = [personId, email, message];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
      contact: result.rows[0],
    });
  } catch (error) {
    console.error("Error submitting contact inquiry:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while submitting your inquiry.",
      error: error.message,
    });
  }
};

module.exports = {
  getHowToUse,
  updateGeneralSettings,
  updatePrivacySettings,
  updateSecuritySettings,
  getPrivacySettings,
  getContactUs,
  postContactUs,
};
