import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/sliceUser"

const store=configureStore({
    reducer:{
        users:userSlice
    }
})


export default store