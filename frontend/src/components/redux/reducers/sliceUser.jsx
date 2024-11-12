import {createSlice} from "@reduxjs/toolkit"
import { act } from "react"

export const sliceUser=createSlice({
    name:"User",
    initialState:{
        users:[]
    },
    reducers:{
        register :(state,action)=>{
            state.users.push(action.payload)
        } ,
        login : (state,action)=>{
            //comment
        }
    }
})

export const {register}=sliceUser.actions
export default sliceUser.reducer
