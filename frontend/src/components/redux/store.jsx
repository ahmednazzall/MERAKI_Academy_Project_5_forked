import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/sliceUser"
import  postsSlice  from "./reducers/slicePosts";

const store=configureStore({
    reducer:{
        users:userSlice,
        posts:postsSlice
    }
})


export default store