import React, { useState, useEffect } from "react";
import axios from "axios";

const Events = ({ userId, token }) => {
  const [todaysBirthdays, setTodaysBirthdays] = useState([]);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost/5000/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        filterTodaysBirthdays(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [token]);

  const filterTodaysBirthdays = (users) => {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    const birthdaysToday = users.filter((user) => {
      const birthDate = new Date(user.birth_date);
      return (
        birthDate.getMonth() + 1 === todayMonth &&
        birthDate.getDate() === todayDay
      );
    });

    setTodaysBirthdays(birthdaysToday);
  };

  const handleGreetingChange = (event) => {
    setGreeting(event.target.value);
  };

  const sendGreeting = (recipientId) => {
    if (greeting.trim()) {
      axios
        .post(
          `https://localhost/5000/greeting/send`,
          { user_id, recipientId, greeting },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          alert("Greeting sent!");
          setGreeting("");
        })
        .catch((error) => {
          console.error("Error sending greeting:", error);
          alert("Failed to send greeting.");
        });
    } else {
      alert("Please write a greeting first.");
    }
  };

  return (
    <div className="birthdays-section">
      {todaysBirthdays.length > 0 ? (
        todaysBirthdays.map((user) => (
          <div key={user.user_id} className="birthday-card">
            <h3>{user.user_name}</h3>
            <p>🎉 Happy Birthday! 🎉</p>
            <textarea
              value={greeting}
              onChange={handleGreetingChange}
              placeholder="Write a greeting..."
            />
            <button onClick={() => sendGreeting(user.id)}>Send Greeting</button>
          </div>
        ))
      ) : (
        <p>No birthdays today</p>
      )}
    </div>
  );
};

export default Events;
