import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Paper,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthService from "../../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../../app/slices/AuthSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import logo from "../../../../assets/Logo.svg";
import passwordHideIcon from "../../../../assets/hide-password.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileLogin from "../mobile/MobileLogin";

const theme = createTheme();

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters required")
    .required("Password is required"),
});

const CustomTextField = ({ label, error, ...props }) => (
  <Box sx={{ paddingBottom: "20px", boxSizing: "border-box" }}>
    <Typography
      component="label"
      variant="body2"
      sx={{
        backgroundColor: "#fff",
        color: `${error ? "red" : "#777"}`,
      }}
    >
      {label}
    </Typography>
    <Field
      as={TextField}
      fullWidth
      margin="normal"
      error={error}
      {...props}
      sx={{
        "& .MuiInputBase-root": {
          marginTop: "-15px",
        },
      }}
    />
  </Box>
);

const Login = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    AuthService.userLogin(values)
      .then((response) => {
        const message = response?.data?.message || "Logged In Successfully";
        toast.success(message);
        dispatch(addUser(response.data.data));
        navigate("/secured");
        setSubmitting(false);
      })
      .catch((err) => {
        const message = err.response
          ? err.response.data.message
          : "Could not login";
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      {isMobile ? (
        <MobileLogin
          theme={theme}
          logo={logo}
          handleSubmit={handleSubmit}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
          passwordHideIcon={passwordHideIcon}
          showPassword={showPassword}
          validationSchema={validationSchema}
          CustomTextField={CustomTextField}
        />
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="Logo" />
              <p style={{ color: "#fff", paddingBottom: "10px" }}>Blog Post</p>
              <Paper
                sx={{ p: 4, width: "100%", borderRadius: "10px" }}
                elevation={5}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h6"
                    color={"#555"}
                    mb={5}
                    mt={2}
                  >
                    Login to get started
                  </Typography>
                </Box>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  validateOnBlur
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form noValidate>
                      <div style={{ height: "90px" }}>
                        <CustomTextField
                          name="email"
                          id="email"
                          label="Email"
                          size="small"
                          error={touched.email && Boolean(errors.email)}
                        />
                        <Typography
                          style={{
                            marginTop: "-25px",
                            fontSize: "14px",
                            color: "red",
                            // color: "#DC143C",
                          }}
                        >
                          {touched.email && errors.email ? errors.email : ""}
                        </Typography>
                      </div>
                      <div>
                        <CustomTextField
                          name="password"
                          id="password"
                          label="Password"
                          size="small"
                          type={showPassword ? "text" : "password"}
                          error={touched.password && Boolean(errors.password)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  sx={{ backgroundColor: "inherit" }}
                                >
                                  <img
                                    src={passwordHideIcon}
                                    alt="password hide icon"
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Typography
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "-25px",
                            fontSize: "14px",
                            color: "red",
                            // color: "#DC143C",
                          }}
                        >
                          <Grid item xs={7}>
                            {touched.password && errors.password
                              ? errors.password
                              : ""}
                          </Grid>
                          <Link
                            to="#"
                            variant="body2"
                            style={{
                              textDecoration: "none",
                              fontSize: "14px",
                              color: "#0d6efd",
                            }}
                          >
                            Forgot password?
                          </Link>
                        </Typography>
                      </div>
                      <Grid
                        item
                        container
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            mb: 2,
                            mt: 4,
                            borderRadius: "50px",
                            textTransform: "capitalize",
                            padding: "4px 60px",
                          }}
                          disabled={isSubmitting}
                        >
                          Login
                        </Button>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default Login;
