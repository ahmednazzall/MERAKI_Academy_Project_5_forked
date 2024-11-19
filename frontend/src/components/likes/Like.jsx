import React, { useState, useEffect } from "react";
import axios from "axios";

const Like = ({ postId, userId }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [likedBy, setLikedBy] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [showUsers, setShowUsers] = useState(false); // حالة لعرض الأسماء عند التمرير
  const token = localStorage.getItem("token");

  // Fetch likes data
  const fetchLikes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/reacts/${postId}/likes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLikesCount(response.data.count);
      setLikedBy(response.data.users);
      setIsLiked(response.data.isLiked); // تحديث حالة الإعجاب
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  // Toggle like status
  const toggleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/reacts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        fetchLikes(); // Refresh likes data
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [postId]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* زر الإعجاب */}
      <button
        onClick={toggleLike}
        onMouseEnter={() => setShowUsers(true)}  // عرض الأسماء عند التمرير
        onMouseLeave={() => setShowUsers(false)} // إخفاء الأسماء عند الخروج من الزر
        style={{
          background: "none",
          border: "none",
          color: isLiked ? "red" : "blue", // لون مختلف للإعجاب
          textDecoration: "none",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        {isLiked ? "Unlike" : "Like"} ({likesCount})
      </button>

      {/* إظهار أسماء المستخدمين عند التمرير */}
      {showUsers && likedBy.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            backgroundColor: "white",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ margin: "0", fontWeight: "bold" }}>Liked by:</p>
          <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
            {likedBy.map((username, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {username}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Like;
