// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   _id: "",
// };
// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialState,
//   reducers: {
//     addUser: (state, action) => {
//       return action.payload;
//     },

//     removeUser: () => {
//       return { _id: "", email: "" };
//     },

//     addProject: (state, action) => {
//       return action.payload;
//     },
//   },
// });

// export const { addUser, removeUser, updateUser, addProject } =
//   authSlice.actions;
// export const selectUser = (state) => state.auth;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  blogs: [], // Adding a field to store user's blogs
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      return { ...state, ...action.payload };
    },

    removeUser: () => {
      return { _id: "", email: "", blogs: [] };
    },

    addBlog: (state, action) => {
      state.blogs.push(action.payload); // Adding a blog to the user's blog list
    },

    updateBlog: (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog._id === action.payload._id
      );
      if (index !== -1) {
        state.blogs[index] = action.payload; // Updating the blog in the user's blog list
      }
    },

    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter(
        (blog) => blog._id !== action.payload._id
      ); // Removing the blog from the user's blog list
    },
  },
});

export const { addUser, removeUser, addBlog, updateBlog, deleteBlog } =
  authSlice.actions;
export const selectUser = (state) => state.auth;

export default authSlice.reducer;
