import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

interface User {
  userName: string;
  password: string;
}

export default function RegisterPage() {
  const [userDetails, setUserDetails] = useState<User>({
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios
      .post(
        "https://jeysiva-expense-tracker-server.vercel.app/signup",
        userDetails
      )
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          return;
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", userDetails.userName);
        navigate("/expense-tracker");
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err.message));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images2.alphacoders.com/124/1240705.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 className="title" style={{ margin: 0 }}>
              Expense Tracker
            </h3>
            <p className="quote">Track, Manage and Control</p>
            <h4 className="title">Create a new account</h4>
            {error && <p className="errorMsg">{error}</p>}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="email"
                value={userDetails.userName}
                onChange={(event) =>
                  setUserDetails({
                    ...userDetails,
                    userName: event.target.value,
                  })
                }
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userDetails.password}
                onChange={(event) =>
                  setUserDetails({
                    ...userDetails,
                    password: event.target.value,
                  })
                }
              />

              <Button
                className="button"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "black" }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <span id="styled-link" onClick={() => navigate("/")}>
                    {"Already have an account? Sign In here"}
                  </span>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
