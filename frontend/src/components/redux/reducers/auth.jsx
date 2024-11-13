import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("user_id") || null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    SetUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("user_id", action.payload);
    },
    Logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { login, SetUserId, Logout } = authSlice.actions;
export default authSlice.reducer;
