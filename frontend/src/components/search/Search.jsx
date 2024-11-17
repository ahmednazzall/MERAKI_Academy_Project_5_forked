import React, { useState } from "react";
import axios from "axios";
// import { Input, List, message } from "antd";
import {Input ,List ,Avatar ,  Button , FloatButton} from 'antd'
import {QuestionCircleOutlined} from '@ant-design/icons'
const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const token = localStorage.getItem("token"); // Ensure a valid token is retrieved

    axios
      .get(`http://localhost:5000/users/userName/search/?searchUser=${searchInput}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      })
      .then((response) => {
        console.log(response);
        
        if (response.data.success) {
          setSearchResults(response.data.User); // Update state with results
          message.success("User(s) found!");
        }
      })
      .catch((error) => {
        if (error.response) {
          // Handle specific backend error responses
          if (error.response.status === 404) {
            console.log("User does not exist.");
            
          } else if (error.response.status === 403) {
            console.log("Unauthorized. Please log in again.");
            
          } else {
            console.log(error);
            
            console.log("An error occurred while searching.");
            
          }
        } else {
          console.log("Server error. Please try again later.");
          
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
              title={user.user_name} // Adjust field name as per backend response
              description={user.user_name} // Adjust field name as per backend response
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Search;
