import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    updateComment: (state, action) => {
      //use findIndex
      const index = state.comments.findIndex(
        (comment) => comment.comment_id === action.payload.comment_id
      );
      if (index !== -1) {
        state.comments[index] = action.payload;
      }

      //   or using map

      //   state.comments = state.comments.map((comment) =>
      //     comment.comment_id === action.payload.comment_id
      //       ? { ...comment, ...action.payload }
      //       : comment
      //   );
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.comment_id !== action.payload
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setComments,
  addComment,
  updateComment,
  deleteComment,
  setError,
} = commentsSlice.actions;

export default commentsSlice.reducer;
