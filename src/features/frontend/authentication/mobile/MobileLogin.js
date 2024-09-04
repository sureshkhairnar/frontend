import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Form } from "formik";
import passwordHideIcon from "../../../../assets/hide-password.svg";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, InputAdornment } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const Login = ({
  theme,
  logo,
  handleSubmit,
  handleClickShowPassword,
  handleMouseDownPassword,
  showPassword,
  validationSchema,
  CustomTextField,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            minHeight: "20vh",
            marginTop: "-45px",
          }}
        >
          <img src={logo} alt="Logo" width={"75px"} />
          <p style={{ color: "#fff", paddingBottom: "10px" }}>Blog Post</p>
        </Box>
        <Typography component="h1" variant="h6" color={"#555"} mb={4} mt={17}>
          Login to get started
        </Typography>
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
                  }}
                >
                  <Grid item xs={7}>
                    {touched.password && errors.password ? errors.password : ""}
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
                pt={12}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: "50px",
                    textTransform: "capitalize",
                  }}
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
