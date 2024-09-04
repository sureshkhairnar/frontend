import React, { useState, useEffect } from "react";
import BlogService from "../../../services/BlogService";
import {
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  // CardMedia,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { format } from "date-fns";
import Logo from "../../../assets/Logo.svg";
import backIcon from "../../../assets/back arrow.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BlogListMobile from "./mobile/BlogListMobile";
import "./BlogList.css";

const theme = createTheme();

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const loadBlogs = () => {
    BlogService.fetchAllBlogs()
      .then((response) => {
        setBlogs(response.data.data);
        console.log("Blogs loaded", response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const formatDate = (date) => {
    return format(new Date(date), "MMM dd, yyyy");
  };

  const handleEdit = (id) => {
    navigate(`add-blog/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        BlogService.deleteBlog(id)
          .then(() => {
            Swal.fire("Deleted!", "Your blog has been deleted.", "success");
            loadBlogs();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire(
              "Error!",
              "There was an error deleting the blog.",
              "error"
            );
          });
      }
    });
  };

  return (
    <>
      {isMobile ? (
        <BlogListMobile blogs={blogs} formatDate={formatDate} />
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "5px",
            }}
          >
            <img
              src={backIcon}
              alt="back icon"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => navigate(-1)}
            />
            <Typography variant="h6" className="dashboard-title">
              Blog Listing
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            mt={"-35px"}
            mb={"20px"}
          >
            <img
              src={Logo}
              alt="techprime logo"
              width={"60px"}
              style={{ alignSelf: "center" }}
            />
          </Box>
          <Grid container spacing={2}>
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <Card elevation={5}>
                  {/* <CardMedia
                    component="img"
                    alt={blog.title}
                    height="140"
                    image={blog.imageUrl} // Adjust the property name based on your data structure
                    title={blog.title}
                    sx={{ objectFit: "cover" }}
                  /> */}
                  <CardContent>
                    <Typography variant="h6">{blog.title}</Typography>
                    <Typography color="textSecondary">{blog.author}</Typography>
                    <Typography color="textSecondary">
                      {blog.category}
                    </Typography>
                    <Typography color="textSecondary">
                      {blog.tags.join(", ")}
                    </Typography>
                    <Typography color="textSecondary">
                      {blog.createdAt
                        ? formatDate(blog.createdAt)
                        : "Date not available"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleEdit(blog._id)}
                      variant="outlined"
                      color="primary"
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleDelete(blog._id)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default BlogList;
