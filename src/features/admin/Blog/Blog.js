import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogList from "./BlogList";

const Blog = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<BlogList />} />
      </Routes>
    </>
  );
};

export default Blog;
