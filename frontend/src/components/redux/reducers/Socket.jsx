import { createSlice } from "@reduxjs/toolkit";


export const sliceSocket = createSlice({
  name: "User",
  initialState: {
    socket:null,
  },
  reducers: {
  setSocket:(state,action)=>{
    state.socket=action.payload
  }
  },
});

export const {
    setSocket
} = sliceSocket.actions;

export default sliceSocket.reducer;

export const init=()=> async()=>{

}