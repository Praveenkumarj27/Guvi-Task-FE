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
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { url } from "../Api/api";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

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
  let [username, setusername] = useState("")
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
      username,
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
    if (res.status === 200) {
      alert("Profile Updated");
    } else if (res.data.statusCode === 401) {
      alert(res.data.message);
    } else {
      alert(res.data.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ textAlign: "left", marginLeft: "50px" }}
      >
        <Button
          variant="outlined"
          color="error"
          type="submit"
          onClick={() => doLogout()}
          // variant="contained"
          sx={{ mt: 2, ml: 145 }}
        >
          Logout
        </Button>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Box component="form" onSubmit={() => handleSubmit()} sx={{ mt: 1 }}>
          {/* <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              variant="standard"
              label="Name"
              value={username}
              name="name"
              autoComplete="name"
              onChange={(e) => setusername(e.target.value)}
            /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              variant="standard"
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
              variant="standard"
              type="Mobile"
              onChange={(e) => setMobile(e.target.value)}
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              variant="standard"
              fullWidth
              name="DOB"
              label="DOB"
              type="DOB"
              id="DOB"
              onChange={(e) => setDOB(e.target.value)}
            />

            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              onChange={(e) => setGender(e.target.value)}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>

            <TextField
              margin="normal"
              typeof="number"
              required
              fullWidth
              variant="standard"
              name="Age"
              label="Age"
              type="Age"
              id="Age"
              onChange={(e) => setAge(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              onClick={() => handleSubmit()}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Profile;
