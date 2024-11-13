import {createSlice} from "@reduxjs/toolkit"

export const followerSlice = createSlice({
    name :"followers",
    initialState :{
        followers : []
    },
    reducers : {
        setFollowers : (state,action)=>{
            state.followers = action.payload
        },
        addFollower : (state , action)=>{
            state.followers.push(payload.action)
        },
        unFollow : (state,action)=>{
            const newFollowers = state.followers.filter((elem,ind)=>{
                return elem.follow_id  != action.payload.follow_id
            })
            state.followers = newFollowers
        }

    }
})
export const {setFollowers , addFollower , unFollow} = followerSlice.actions ;
export default followerSlice.reducer ;
