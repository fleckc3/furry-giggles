import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { EmailInput } from "src/components/rhf-inputs";
import useAuth from "src/hooks/useAuth";
import { useState, useEffect } from "react";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { user, loginEmailPassword, logout } = useAuth();

  const loginHandler = () => {
    loginEmailPassword(loginEmail, loginPassword);
  };

  const logoutHandler = () => {
    logout();
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            item
            container
            justifyContent="center"
            xs={12}
            md={4}
            spacing={3}
          >
            <Card>
              <CardHeader title="Login" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <EmailInput name="email" required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Password"
                      type="password"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={loginHandler}
                >
                  Login
                </Button>
              </CardActions>
            </Card>

            <Grid item xs={12}></Grid>
            {/* <Box mt={3}>
              <input
                style={{ display: "block" }}
                placeholder="Email..."
                onChange={(event) => setLoginEmail(event.target.value)}
              />

              <input
                style={{ display: "block" }}
                placeholder="Password..."
                onChange={(event) => setLoginPassword(event.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={loginHandler}
              >
                Login
              </Button>
            </Box> */}
          </Grid>
          {/* <Grid item container justifyContent="center" xs={12}>
            <Box mt={3}>
              <Typography variant="h5">
                User logged in: {user ? user.email : "Not Logged In"}
              </Typography>

              <Button
                style={{ display: "block" }}
                variant="contained"
                color="warning"
                onClick={logoutHandler}
              >
                Sign out
              </Button>
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}

export default Login;
