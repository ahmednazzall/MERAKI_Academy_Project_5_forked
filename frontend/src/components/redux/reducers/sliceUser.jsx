import { createSlice } from "@reduxjs/toolkit";

import { act } from "react";

export const sliceUser = createSlice({
  name: "User",
  initialState: {
    users: []
  },
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
    },
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getUserById: (state, action) => {      
      state.users = [action.payload];
    },
    getUserByUserName: (state, action) => {
      state.users = action.payload;
    },
    updateUserById: (state, action) => {
      
      const updated = state.users.map((user) => {
        if (user.user_id == action.payload.user_id) {
          return action.payload;
        }
      });
      
       state.users=updated;
    },
    SoftDeleteUserById: (state, action) => {
      const deleted = state.users.filter((user) => {
        return user.user_id !== action.payload.user_id;
      });
       state.users=deleted;
    },
    updateProfileImage:(state,action)=>{
      state.users = state.users.map((user) => {
        if (user.user_id === action.payload.user_id) {
          return action.payload;
        }
      });
      return users;
    }
  },

});

export const {
  register,
  getAllUsers,
  getUserById,
  getUserByUserName,
  updateUserById,
  SoftDeleteUserById,
} = sliceUser.actions;


export default sliceUser.reducer;