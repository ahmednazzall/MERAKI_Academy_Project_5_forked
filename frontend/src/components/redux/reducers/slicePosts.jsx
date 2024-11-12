import {createSlice} from "@reduxjs/toolkit"
export const postsSlice = createSlice({
    name : "Posts",
    initialState :{
        posts:[]
    },
    reducers :{
        setPosts : (state , action) =>{
            state.articles = action.payload ;
        } ,
        createPost : (state,action)=>{
            state.posts.push(action.payload)
        },
       updatePost : (state,action)=>{
        const postById = state.posts.filter((elem , i)=>{
            return elem.post_id == action.payload.post_id
        })
        state.posts[state.posts.indexOf(postById[0])] = action.payload.newPost
       },
      deletePost : (state,action)=>{
        const postById = state.posts.filter((elem , i)=>{
            return elem.post_id !== action.payload.post_id
        })
        state.posts = postById
       }
    }
})
export const {setPosts , createPost , updatePost , deletePost} = postsSlice.actions
export default postsSlice.reducer