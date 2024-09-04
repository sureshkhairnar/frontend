import React from "react";
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
  Paper,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import BlogService from "../../../../services/BlogService";
import Swal from "sweetalert2";
import { addBlog } from "../../../../app/slices/AuthSlice";

const AddEditBlog = ({ validationSchema }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = useLocation();

  const handleSubmit = (values, { resetForm }) => {
    BlogService.createBlog(values)
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
  };
  return (
    <Box>
      <Paper
        sx={{
          padding: "15px",
          borderRadius: "10px",
          minHeight: "100vh",
          margin: "72px 0px 70px 0px",
        }}
        elevation={5}
      >
        <Box>
          <Formik
            initialValues={{
              title: "",
              content: "",
              author: "",
              category: "",
              tags: "",
              publishDate: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue, handleBlur, values }) => (
              <Form>
                <Grid container spacing={2} mb={5}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      size="large"
                      label="Blog Title"
                      name="title"
                      variant="outlined"
                      helperText={touched.title && errors.title}
                      error={touched.title && Boolean(errors.title)}
                      onBlur={handleBlur}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} maxWidth={"lg"}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      multiline
                      rows={6}
                      variant="outlined"
                      label="Content"
                      name="content"
                      helperText={touched.content && errors.content}
                      error={touched.content && Boolean(errors.content)}
                      onBlur={handleBlur}
                      onChange={(e) => setFieldValue("content", e.target.value)}
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
                  <Grid item xs={12} sm={6}>
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
                        value={values?.category || ""}
                        onBlur={handleBlur}
                        onChange={(e) =>
                          setFieldValue("category", e.target.value)
                        }
                      >
                        <MenuItem value="Tech">Tech</MenuItem>
                        <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                        <MenuItem value="Travel">Education</MenuItem>
                      </Field>
                      <FormHelperText>
                        {touched.category && errors.category}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      label="Tags (comma separated)"
                      name="tags"
                      helperText={touched.tags && errors.tags}
                      error={touched.tags && Boolean(errors.tags)}
                      onBlur={handleBlur}
                      onChange={(e) => setFieldValue("tags", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      type="date"
                      label="Publish Date"
                      name="publishDate"
                      InputLabelProps={{ shrink: true }}
                      helperText={touched.publishDate && errors.publishDate}
                      error={touched.publishDate && Boolean(errors.publishDate)}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("publishDate", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{
                        borderRadius: "50px",
                        padding: "5px 30px",
                        textTransform: "capitalize",
                      }}
                    >
                      {path?.pathname?.split("/")?.length === 5
                        ? "Update"
                        : "Save"}{" "}
                      Blog
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddEditBlog;
