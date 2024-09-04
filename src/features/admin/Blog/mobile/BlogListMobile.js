import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  InputAdornment,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import "./BlogList.css";
import Swal from "sweetalert2";
import BlogService from "../../../../services/BlogService";
import { useNavigate } from "react-router-dom";

const BlogList = ({ blogs, formatDate }) => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      setFilteredBlogs(
        blogs.filter(
          (blog) =>
            blog?.title?.toLowerCase().includes(term) ||
            blog?.category?.toLowerCase().includes(term) ||
            blog?.author?.toLowerCase().includes(term) ||
            blog?.status?.toLowerCase().includes(term)
        )
      );
    } else {
      setFilteredBlogs(blogs);
    }
  };

  const handleSort = (criteria) => {
    setFilteredBlogs(
      [...filteredBlogs].sort((a, b) => {
        if (a[criteria] < b[criteria]) return -1;
        if (a[criteria] > b[criteria]) return 1;
        return 0;
      })
    );
    setDrawerOpen(false);
  };

  useEffect(() => {
    setFilteredBlogs([...blogs]);
  }, [blogs]);

  return (
    <Box sx={{ marginBottom: "70px" }}>
      <Box
        sx={{
          mb: 1.3,
          mt: 9,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "grey" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setDrawerOpen(true)}>
                  <SortIcon sx={{ color: "grey" }} />
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          sx={{
            "& .MuiInputBase-root": {
              borderBottom: "1px solid grey",
              borderRadius: 10,
              "&:before": {
                display: "none",
              },
              "&:after": {
                display: "none",
              },
            },
            "& input::placeholder": {
              color: "grey",
            },
            "& .MuiInputBase-input": {
              padding: "10px 10px",
            },
          }}
        />

        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{ zIndex: 99999, borderTop: "2px solid grey" }}
        >
          <Box>
            <Typography variant="h6" className="drawerHeader">
              Sort Blogs By
            </Typography>
          </Box>
          <Box className="drawerListItem">
            <List>
              <ListItem onClick={() => handleSort("title")}>
                <ListItemText primary="Title" />
              </ListItem>
              <ListItem onClick={() => handleSort("date")}>
                <ListItemText primary="Date" />
              </ListItem>
              <ListItem onClick={() => handleSort("category")}>
                <ListItemText primary="Category" />
              </ListItem>
              <ListItem onClick={() => handleSort("author")}>
                <ListItemText primary="Author" />
              </ListItem>
              <ListItem onClick={() => handleSort("status")}>
                <ListItemText primary="Status" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
      <Grid container spacing={1}>
        {filteredBlogs.map((blog) => (
          <Grid item xs={12} key={blog._id}>
            <Card className="card">
              <CardContent className="cardContent">
                <Box className="blogHeader">
                  <Typography className="blogTitle">{blog.title}</Typography>
                  <Typography className="blogStatus">{blog.status}</Typography>
                </Box>

                <Typography className="blogDate">
                  {blog.createdAt
                    ? formatDate(blog.createdAt)
                    : "Date not available"}
                </Typography>
                <Typography className="blogDetails" sx={{ marginTop: "8px" }}>
                  Author: <span className="blogDetailSpan">{blog.author}</span>
                </Typography>
                <Typography className="blogDetails">
                  Category:{" "}
                  <span className="blogDetailSpan">{blog.category}</span>
                </Typography>
                <Typography className="blogDetails">
                  Tags: <span className="blogDetailSpan">{blog.tags}</span>
                </Typography>
              </CardContent>
              <Box className="cardActions">
                <Button
                  size="small"
                  fullWidth
                  onClick={() => navigate(`add-blog/${blog._id}`)}
                  variant="outlined"
                  color="primary"
                  sx={{
                    margin: "0 1px",
                    padding: "1px 10px",
                    textTransform: "capitalize",
                    borderRadius: 10,
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  fullWidth
                  onClick={() =>
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
                        BlogService.deleteBlog(blog._id)
                          .then(() => {
                            Swal.fire(
                              "Deleted!",
                              "Your blog has been deleted.",
                              "success"
                            );
                            // loadBlogs();
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
                    })
                  }
                  variant="outlined"
                  color="error"
                  sx={{
                    margin: "0 1px",
                    padding: "1px 10px",
                    textTransform: "capitalize",
                    borderRadius: 10,
                    marginLeft: 1,
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogList;
