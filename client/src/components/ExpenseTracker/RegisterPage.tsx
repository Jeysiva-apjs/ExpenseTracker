import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import apiClient from "./api-client";

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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    await apiClient
      .post("/user/signup", userDetails)
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          setIsLoading(false);
          return;
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", userDetails.userName);
        navigate("/expense-tracker");
        setIsLoading(false);
        setError("");
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
      });
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
            backgroundImage: "url(home.jpg)",
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
            style={{ margin: "20px" }}
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4 className="title">Create a new account</h4>
            <br />
            {error && <p className="errorMsg">{error}</p>}
            <br />
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
              {isLoading ? (
                <Button
                  className="button"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ backgroundColor: "black" }}
                >
                  <CircularProgress size={25} />
                </Button>
              ) : (
                <Button
                  className="button"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ backgroundColor: "black" }}
                >
                  Register
                </Button>
              )}

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
