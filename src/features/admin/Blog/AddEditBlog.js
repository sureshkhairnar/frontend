import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Typography,
  Paper,
  useMediaQuery,
  createTheme,
  Card,
  CardMedia,
} from "@mui/material";
import BlogService from "../../../services/BlogService";
import Swal from "sweetalert2";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Logo from "../../../assets/Logo.svg";
import backIcon from "../../../assets/back arrow.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { addBlog } from "../../../app/slices/AuthSlice";
import { useDispatch } from "react-redux";
import AddEditBlogMobile from "./mobile/AddEditBlogMobile";
import "./BlogList.css";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  author: Yup.string().required("Author is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.string().required("Tags are required"),
  publishedDate: Yup.date()
    .required("Published date is required")
    .nullable()
    .typeError("Invalid date format"),
  image: Yup.mixed().required("Image is required").nullable(),
});

const theme = createTheme();

const AddEditBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = useLocation();
  const blogId =
    path.pathname.split("/").length === 5 ? path.pathname.split("/").pop() : "";
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    publishedDate: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    if (blogId) {
      BlogService.updateBlog(blogId, formData)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response?.data?.message,
            timer: 1500,
            showCancelButton: false,
          });
          resetForm();
          dispatch(addBlog(response?.data?.data));
          navigate("/secured/blogs");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err?.message,
          });
          console.log(err);
        });
    } else {
      BlogService.createBlog(formData)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response?.data?.message,
            timer: 1500,
            showCancelButton: false,
          });
          resetForm();
          dispatch(addBlog(response?.data?.data));
          navigate("/secured/blogs");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err?.message,
          });
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await BlogService.fetchOneBlog(blogId);
        setInitialValues({
          title: response.data.title || "",
          content: response.data.content || "",
          author: response.data.author || "",
          category: response.data.category || "",
          tags: response.data.tags || "",
          publishedDate: response.data.publishedDate || "",
          image: response.data.image || "",
        });
        if (response.data.image) {
          setImagePreview(response.data.image);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    if (blogId) {
      fetchBlogData();
    }
  }, [blogId]);

  return (
    <>
      {isMobile ? (
        <AddEditBlogMobile
          backIcon={backIcon}
          validationSchema={validationSchema}
          navigate={navigate}
        />
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
              {path?.pathname?.split("/").length === 5
                ? "Update Blog"
                : "Create Blog"}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center" }}
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
          <Paper
            sx={{ padding: "20px", borderRadius: "10px", minHeight: "100vh" }}
          >
            <Box>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ errors, touched, setFieldValue, handleBlur, values }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={8}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {!imagePreview && (
                          <label htmlFor="image">
                            <Button variant="outlined" component="span">
                              Upload Blog Image
                              <input
                                type="file"
                                accept="image/*"
                                id="image"
                                name="image"
                                onChange={(e) => {
                                  const file = e.currentTarget.files[0];
                                  setFieldValue("image", file);
                                  setImagePreview(URL.createObjectURL(file));
                                }}
                                style={{ display: "none" }}
                              />
                            </Button>
                          </label>
                        )}
                        {imagePreview && (
                          <Card sx={{ marginTop: 2, minWidth: 100 }}>
                            <CardMedia
                              component="img"
                              alt="Blog Image"
                              height="200"
                              image={imagePreview}
                            />
                          </Card>
                        )}
                      </Grid>
                      <Grid item xs={12} md={8} mb={2}>
                        <Field
                          as={TextField}
                          fullWidth
                          size="large"
                          label="Title"
                          name="title"
                          variant="outlined"
                          helperText={touched.title && errors.title}
                          error={touched.title && Boolean(errors.title)}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} md={8} mb={2}>
                        <Field
                          as={TextField}
                          fullWidth
                          size="large"
                          label="Content"
                          name="content"
                          variant="outlined"
                          multiline
                          rows={3}
                          helperText={touched.content && errors.content}
                          error={touched.content && Boolean(errors.content)}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Field
                          as={TextField}
                          fullWidth
                          size="large"
                          label="Author"
                          name="author"
                          variant="outlined"
                          helperText={touched.author && errors.author}
                          error={touched.author && Boolean(errors.author)}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <FormControl
                          fullWidth
                          error={touched.category && Boolean(errors.category)}
                        >
                          <InputLabel id="category-label">Category</InputLabel>
                          <Field
                            as={Select}
                            labelId="category-label"
                            id="category-select"
                            label="Category"
                            name="category"
                            onBlur={handleBlur}
                            value={values.category || ""}
                            onChange={(e) =>
                              setFieldValue("category", e.target.value)
                            }
                          >
                            <MenuItem value="Tech">Tech</MenuItem>
                            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                            <MenuItem value="Education">Education</MenuItem>
                          </Field>
                          <FormHelperText>
                            {touched.category && errors.category}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <hr style={{ visibility: "hidden" }} />
                      <Grid item xs={12} md={4}>
                        <Field
                          as={TextField}
                          fullWidth
                          variant="outlined"
                          type="text"
                          label="Tags (comma separated)"
                          name="tags"
                          helperText={touched.tags && errors.tags}
                          error={touched.tags && Boolean(errors.tags)}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Field
                          as={TextField}
                          fullWidth
                          variant="outlined"
                          type="date"
                          label="Published Date"
                          name="publishedDate"
                          InputLabelProps={{ shrink: true }}
                          helperText={
                            touched.publishedDate && errors.publishedDate
                          }
                          error={
                            touched.publishedDate &&
                            Boolean(errors.publishedDate)
                          }
                          onBlur={handleBlur}
                          onChange={(e) =>
                            setFieldValue("publishedDate", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={8}
                        sx={{ display: "flex" }}
                        justifyContent={"start"}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          sx={{
                            marginRight: "20px",
                            textTransform: "capitalize",
                          }}
                        >
                          {path?.pathname?.split("/").length === 5
                            ? "Update Blog"
                            : "Save Blog"}
                        </Button>
                        {path?.pathname?.split("/").length === 5 ? (
                          <Button
                            type="reset"
                            variant="outlined"
                            size="large"
                            onClick={() => navigate("/secured/blogs")}
                            sx={{ textTransform: "capitalize" }}
                          >
                            Cancel
                          </Button>
                        ) : (
                          ""
                        )}
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default AddEditBlog;
