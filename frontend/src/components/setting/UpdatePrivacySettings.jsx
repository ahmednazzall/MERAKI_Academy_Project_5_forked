import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdatePrivacySettings = () => {
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [blockedUsers, setBlockedUsers] = useState([]); // قائمة بالمستخدمين المحظورين
  const [allUsers, setAllUsers] = useState([]); // قائمة بكل أسماء المستخدمين
  const [blockInput, setBlockInput] = useState(""); // إدخال اسم المستخدم للحظر
  const [error, setError] = useState("");

  useEffect(() => {
    // جلب إعدادات الخصوصية الحالية
    axios
      .get("http://localhost:5000/settings/privacy", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const { profile_visibility, blocked_accounts } = response.data;
        setProfileVisibility(profile_visibility);
        setBlockedUsers(blocked_accounts || []);
      })
      .catch((error) =>
        console.error("Error fetching privacy settings:", error)
      );

    // جلب قائمة المستخدمين من قاعدة البيانات
    axios
      .get("http://localhost:5000/users/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const { users } = response.data; // افترض أن الـ API يعيد قائمة المستخدمين
        setAllUsers(users.map((user) => user.user_name)); // استخراج أسماء المستخدمين فقط
      })
      .catch((error) =>
        console.error("Error fetching users from database:", error)
      );
  }, []);

  const handleBlock = async (userName) => {
    setError("");

    // التحقق إذا كان اسم المستخدم موجودًا في قائمة المستخدمين
    if (!allUsers.includes(userName)) {
      setError(`User with username "${userName}" does not exist.`);
      return;
    }

    // التحقق إذا كان المستخدم محظورًا بالفعل
    if (blockedUsers.includes(userName)) {
      setError(`User with username "${userName}" is already blocked.`);
      return;
    }

    // إرسال طلب الحظر
    try {
      await axios.put(
        "http://localhost:5000/settings/privacy",
        { blocked_accounts: [userName] },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setBlockedUsers([...blockedUsers, userName]);
      alert("User blocked successfully!");
    } catch (error) {
      console.error("Error blocking user:", error);
      alert("Error blocking user.");
    }
  };

  const handleUnblock = async (userName) => {
    try {
      await axios.post(
        "http://localhost:5000/settings/privacy",
        { unblock_user_name: userName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setBlockedUsers(blockedUsers.filter((name) => name !== userName));
      alert("User unblocked successfully!");
    } catch (error) {
      console.error("Error unblocking user:", error);
      alert("Error unblocking user.");
    }
  };

  const handleVisibilityChange = (e) => {
    const visibility = e.target.value;
    setProfileVisibility(visibility);
    axios
      .post(
        "http://localhost:5000/settings/privacy",
        { profile_visibility: visibility },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => alert("Profile visibility updated successfully!"))
      .catch((error) => {
        console.error("Error updating profile visibility:", error);
        alert("Error updating profile visibility.");
      });
  };

  return (
    <div>
      <h2>Privacy Settings</h2>
      <label>
        Profile Visibility:
        <select value={profileVisibility} onChange={handleVisibilityChange}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </label>
      <h3>Block Users</h3>
      <input
        type="text"
        placeholder="Enter username"
        value={blockInput}
        onChange={(e) => setBlockInput(e.target.value)}
      />
      <button
        onClick={() => {
          handleBlock(blockInput);
          setBlockInput("");
        }}
      >
        Block
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h3>Blocked Users</h3>
      {blockedUsers.map((userName) => (
        <div key={userName}>
          <span>{userName}</span>
          <button onClick={() => handleUnblock(userName)}>Unblock</button>
        </div>
      ))}
    </div>
  );
};

export default UpdatePrivacySettings;
