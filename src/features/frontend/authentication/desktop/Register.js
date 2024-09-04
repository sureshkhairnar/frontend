import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IconButton, InputAdornment } from "@mui/material";
import passwordHideIcon from "../../../assets/hide-password.svg";
import UserService from "../../../services/UserService";
import logo from "../../../assets/Logo.svg";

const theme = createTheme();

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    const userData = {
      ...values,
      status: 1,
      role: "student",
    };

    UserService.createUser(userData)
      .then((response) => {
        const message = response.data.message || "Created";
        Swal.fire({
          icon: "success",
          title: "Success",
          text: message,
        }).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        const message = err.response.data.message || "Not Created";
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
        });
      })
      .finally(() => {
        setLoading(false);
        setSubmitting(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="Logo" />
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            sx={{ color: "#fff", marginTop: "16px", marginBottom: "26px" }}
          >
            Blog Post
          </Typography>
          <Paper
            sx={{ p: 4, width: "100%", borderRadius: "10px" }}
            elevation={5}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h6" color={"#555"}>
                User Registration
              </Typography>
            </Box>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validateOnBlur
            >
              {({ isSubmitting, touched, errors }) => (
                <Form noValidate>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="firstName"
                        label="First Name"
                        fullWidth
                        size="small"
                        required
                        helperText={
                          touched.firstName && errors.firstName
                            ? errors.firstName
                            : ""
                        }
                        error={touched.firstName && Boolean(errors.firstName)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        size="small"
                        required
                        helperText={
                          touched.lastName && errors.lastName
                            ? errors.lastName
                            : ""
                        }
                        error={touched.lastName && Boolean(errors.lastName)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="email"
                        label="Email Address"
                        size="small"
                        fullWidth
                        required
                        helperText={
                          touched.email && errors.email ? errors.email : ""
                        }
                        error={touched.email && Boolean(errors.email)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="mobile"
                        label="Mobile"
                        size="small"
                        fullWidth
                        required
                        helperText={
                          touched.mobile && errors.mobile ? errors.mobile : ""
                        }
                        error={touched.mobile && Boolean(errors.mobile)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        size="small"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        required
                        helperText={
                          touched.password && errors.password
                            ? errors.password
                            : ""
                        }
                        error={touched.password && Boolean(errors.password)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                <img
                                  src={passwordHideIcon}
                                  alt="toggle password visibility"
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" mt={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        borderRadius: "50px",
                        textTransform: "capitalize",
                        padding: "4px 50px",
                      }}
                      disabled={isSubmitting || loading}
                    >
                      {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                  </Grid>
                  <Grid container justifyContent="center" mt={1}>
                    <Grid item>
                      <Link
                        to="/"
                        style={{
                          fontSize: "14px",
                          color: "#0d6efd",
                          textDecoration: "none",
                        }}
                      >
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
