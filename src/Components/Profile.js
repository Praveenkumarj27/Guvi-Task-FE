import {
  Avatar,
  Container,
  CssBaseline,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { url } from "../Api/api";
import { Box } from "@mui/system";
import { Navigate, useNavigate } from "react-router-dom";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function Profile() {
  const theme = createTheme();

  let [data, setData] = useState("");

  let getData = async () => {
    let token = window.sessionStorage.getItem("login_auth_token");
    let userId = window.sessionStorage.getItem("id");
    let res = await axios.get(`${url}/${userId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    if (res.data.statusCode === 200) {
      setData(res.data.users);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();
  let doLogout = () => {
    sessionStorage.removeItem("login_auth_token");
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Button
          variant="outlined"
          color="error"
          type="submit"
          onClick={() => doLogout()}
          // variant="contained"
          sx={{ mt: 2,ml:90 }}
        >
          Logout
        </Button>
        <Box>
        
          <Typography variant="h4" component="h2" sx={{ mt: 2 }}>
            Profile:
          </Typography>
          <Grid
            style={{
              backgroundColor: "white",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "10px",
              marginTop: "30px",
              padding: "30px",
            }}
          >
            <Typography variant="h6" sx={{ mt: 2 }}>
              <b>Username</b>:{data.username}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              <b>Email</b>:{data.email}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              <b>Date of Birth</b>:{data.DOB}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              <b>Gender</b>:{data.gender}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              <b>Mobile</b>:{data.mobile}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              <b>Age</b>:{data.age}
            </Typography>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Profile;
