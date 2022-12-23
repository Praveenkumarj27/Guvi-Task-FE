import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { loginRoute } from "../utils/APIRoutes";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { url } from "../Api/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

const theme = createTheme();

export default function SignIn() {
  const [showPwd, setShowPwd] = useState(true);

  const handleShowPassword = () => {
    setShowPwd(!showPwd);
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      }
      // if (values.username.length === 0) {
      //   errors.username = "Required";
      // } else if (values.username.length < 5) {
      //   errors.username = "Username length should be morethan 5Character";
      // }
      if (values.password.length === 0) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password length should be morethan 8Character";
      }
      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const login = await axios.post(`${url}/login`, values);
        localStorage.setItem("login_auth_token", login.data.token);
        localStorage.setItem("role", login.data.typeofUser);
        resetForm({ values: "" });
        toast.success(login.data.message);
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    lineHeight: "14px",
                    color: "#7e8e9f",
                  }}
                >
                  Email
                </Typography>
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    lineHeight: "14px",
                    color: "#7e8e9f",
                    marginBottom: "10px",
                  }}
                >
                  Password
                </Typography>
                <TextField
                  size="small"
                  item
                  xs={12}
                  required
                  fullWidth
                  name="password"
                  type={!showPwd ? "text" : "password"}
                  id="password"
                  onChange={formik.handleChange}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {showPwd === false ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              onSubmit={formik.handleSubmit}
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#323e45",
                "&:hover": {
                  backgroundColor: "#323e45",
                },
                fontSize: "17px",
                color: "white",
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid
                container
                style={{
                  marginLeft: "80px",
                }}
              >
                <Grid item>
                  Don't have an account?
                  <Link
                    style={{
                      color: "#4e0ef",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                    to="/register"
                  >
                    {" Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
