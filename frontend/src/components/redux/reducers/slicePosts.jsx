import { createSlice } from "@reduxjs/toolkit";
export const postsSlice = createSlice({
  name: "Posts",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload?.reverse();
    },
    createPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      const postById = state.posts.map((elem, i) => {
        if (elem.post_id == action.payload.post_id) {
          elem.body = action.payload.body;
        }
        return elem;
      });
      state.posts = postById;
      // state.posts[state.posts.indexOf(postById[0])] = action.payload.newPost
    },
    deletePost: (state, action) => {
      const newPosts = state.posts.filter((elem, i) => {
        return elem.post_id !== action.payload.post_id;
      });
      state.posts = newPosts;
    },
  },
});
export const { setPosts, createPost, updatePost, deletePost } =
  postsSlice.actions;
export default postsSlice.reducer;
