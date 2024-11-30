import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("user_id") || null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
    visitUser:null
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
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
    },
    setVisitId:(state,action)=>{
      state.visitUser=action.payload
    }
  },
});

export const { login, SetUserId, Logout ,setVisitId} = authSlice.actions;
export default authSlice.reducer;
