import React, {  useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { url } from "../Api/api";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const theme = createTheme();

export default function SignUp() {
  const [showPwd, setShowPwd] = useState(true);

  const handleShowPassword = () => {
    setShowPwd(!showPwd);
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
     
    },

    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      }
      if (values.username.length == 0) {
        errors.username = "Required";
      } else if (values.username.length < 3) {
        errors.username = "Username length should be morethan 3 Character";
      }
      if (values.password.length === 0) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password length should be morethan 8Character";
      }
      //   if(values.password === values.confirmPassword){
      //     errors.confirmPassword="password mismatch"
      //   }

      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        let postData = await axios.post(`${url}/register`, values);
        resetForm({ values: "" });
        toast.success(postData.data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        alert("Register Error!");
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            Validate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
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
                    paddingBottom: "5px",
                  }}
                >
                  User Name
                </Typography>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="UserName"
                  onChange={formik.handleChange}
                  autoFocus
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
                    paddingBottom: "5px",
                  }}
                >
                  Email
                </Typography>
                <TextField
                  size="small"
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
                    paddingBottom: "5px",
                  }}
                >
                  Password
                </Typography>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="password"
                  type={!showPwd ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
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
              {/* <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    lineHeight: "14px",
                    color: "#7e8e9f",
                    paddingBottom: "5px",
                  }}
                >
                  Confirm Password
                </Typography>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="confirmPassword"
                  type={!showPwd ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
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
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              onSubmit={formik.handleSubmit}
              variant="outlined"
              sx={{
                mb: 1,
                backgroundColor: "#323e45",
                color: "white",

                "&:hover": {
                  backgroundColor: "#323e45",
                },

                fontFamily: "DM Sans",
                fontSize: "17px",
                textTransform: "inherit",
                marginTop: "10px",
              }}
            >
              Sign Up
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
                  Already have an account?
                  <Link
                    style={{
                      color: "#4e0ef",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                    to="/"
                  >
                    {" Sign In"}
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
