import React, { useState } from "react";
import axios from "axios";
// import { Input, List, message } from "antd";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const token = localStorage.getItem("token"); // Ensure a valid token is retrieved

    axios
      .get("http://localhost:5000/users", {
        params: { searchUser: searchInput }, // Pass searchUser parameter as expected by the backend
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      })
      .then((response) => {
        if (response.data.success) {
          setSearchResults(response.data.User); // Update state with results
          message.success("User(s) found!");
        }
      })
      .catch((error) => {
        if (error.response) {
          // Handle specific backend error responses
          if (error.response.status === 404) {
            message.warning("User does not exist.");
          } else if (error.response.status === 403) {
            message.error("Unauthorized. Please log in again.");
          } else {
            message.error("An error occurred while searching.");
          }
        } else {
          message.error("Server error. Please try again later.");
        }
      });
  };

  return (
    <div>
      <Input.Search
        placeholder="Search for a user"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSearch={handleSearch} // Trigger search on pressing Enter or clicking the search icon
        enterButton
      />
      <List
        itemLayout="horizontal"
        dataSource={searchResults}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              title={user.userName} // Adjust field name as per backend response
              description={user.email} // Adjust field name as per backend response
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Search;
