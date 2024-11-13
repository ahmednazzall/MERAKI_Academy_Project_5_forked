import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const sliceUser = createSlice({
  name: "User",
  initialState: {
    users: [],
    token: localStorage.getItem("token") || null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
    },
    login: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getUserById: (state, action) => {
      state.users = action.payload;
    },
    getUserByUserName: (state, action) => {
      state.users = action.payload;
    },
    updateUserById: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.user_id === action.payload.user_id) {
          return action.payload;
        }
      });
      return users;
    },
    SoftDeleteUserById: (state, action) => {
      state.users = state.users.filter((user) => {
        return user.user_id !== action.payload;
      });
      return users;
    },
  },
});

export const { register } = sliceUser.actions;
export default sliceUser.reducer;
