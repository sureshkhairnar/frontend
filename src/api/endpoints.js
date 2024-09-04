// export default {
//   serverBaseurl: "http://localhost:2020",
//   api: {
//     auth: {
//       userLogin: "/auth/login",
//       validateToken: "/auth/validate-token",
//       refreshToken: "/auth/refresh-token",
//     },
//     project: {
//       create: "/project",
//       update: "/project/",
//       getAll: "/project",
//     },
//   },
// };

export default {
  serverBaseurl: "http://localhost:3030",
  api: {
    auth: {
      userLogin: "/auth/login",
      validateToken: "/auth/validate-token",
      refreshToken: "/auth/refresh-token",
    },
    blog: {
      create: "/blog", // POST request to create a new blog post with image upload
      update: "/blog/", // PUT request to update a blog post with a specific ID (e.g., /blog/:id)
      getAll: "/blog", // GET request to retrieve all blog posts
      getSingle: "/blog/", // GET request to retrieve a single blog post by ID (e.g., /blog/:id)
      delete: "/blog/", // DELETE request to delete a blog post by ID (e.g., /blog/:id)
    },
  },
};
