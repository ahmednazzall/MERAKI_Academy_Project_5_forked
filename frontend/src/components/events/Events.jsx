import React, { useState, useEffect } from "react";
import axios from "axios";

const Events = ({ userId, token }) => {
  const [todaysBirthdays, setTodaysBirthdays] = useState([]);

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

  return (
    <div className="birthdays-section">
      {todaysBirthdays.length > 0 ? (
        todaysBirthdays.map((user) => (
          <div key={user.id} className="birthday-card">
            <h3>{user.name}</h3>
            <p>🎉 Happy Birthday! 🎉</p>
          </div>
        ))
      ) : (
        <p>No birthdays today</p>
      )}
    </div>
  );
};

export default Events;
