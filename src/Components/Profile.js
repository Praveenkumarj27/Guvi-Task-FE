import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { url } from "../Api/api";


const theme = createTheme();

const Profile = () => {

  let doLogout = () => {
    sessionStorage.removeItem("login_auth_token");
    navigate("/");
  };


  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let params = useParams();
  let [gender, setGender] = useState("");
  let [DOB, setDOB] = useState("");
  let [age, setAge] = useState("");
  let [mobile, setMobile] = useState("");
  let [email, setEmail] = useState("");
  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    let token = window.sessionStorage.getItem("login_auth_token");
    let userId = window.sessionStorage.getItem("id");
    let res = await axios.get(`${url}/${userId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    if (res.data.statusCode === 200) {
      setEmail(res.data.users.email);
    } else if (res.data.statusCode === 401) {
      alert(res.data.message);
    } else {
      alert(res.data.message);
    }
  };

  let handleSubmit = async () => {
    let data = {
      email,
      mobile,
      DOB,
      gender,
      age,
    };

    let token = window.sessionStorage.getItem("token");
    let userId = window.sessionStorage.getItem("id");
    let res = await axios.put(`${url}/edit-user/${userId}`, data, {
      headers: { authorization: `Bearer ${token}` },
    });
    //Just to jump to different route
    if (res.status === 200) navigate("/home");
    else if (res.data.statusCode === 401) {
      alert(res.data.message);
    } else {
      alert(res.data.message);
    }
  };

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EmailIcon />
            <Button
              type="submit"
              fullWidth
              onClick={() =>doLogout() }
              // onSubmit={() =>handleSubmit()}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              logout
            </Button>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box component="form" onSubmit={() => handleSubmit()} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              value={email}
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Mobile"
              label="Mobile"
              type="Mobile"
              id="Mobile"
              onChange={(e) => setMobile(e.target.value)}
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="DOB"
              label="DOB"
              type="DOB"
              id="DOB"
              onChange={(e) => setDOB(e.target.value)}
              // autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Gender"
              label="Gender"
              type="Gender"
              id="Gender"
              onChange={(e) => setGender(e.target.value)}
              autoComplete="current-password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="Age"
              label="Age"
              type="Age"
              id="Age"
              onChange={(e) => setAge(e.target.value)}
              autoComplete="current-password"
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              type="submit"
              fullWidth
              onClick={() => handleSubmit()}
              // onSubmit={() =>handleSubmit()}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
              </Grid>
              <Grid item>
                {/* <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Profile;
