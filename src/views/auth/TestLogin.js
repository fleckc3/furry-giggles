import { Box, Button, Grid, Typography } from "@mui/material";
import useAuth from "src/hooks/useAuth";
import { useState, useEffect } from "react";

function Login() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { user, loginEmailPassword, registerEmailPassword, logout } = useAuth();

  const loginHandler = () => {
    loginEmailPassword(loginEmail, loginPassword);
  };

  const registerHandler = () => {
    registerEmailPassword(registerEmail, registerPassword);
  };

  const logoutHandler = () => {
    logout();
  };

  return (
    <Grid container justifyContent="center">
      <Grid item container xs={12}>
        <Box mt={3}>
          <Typography variant="h5">Register user</Typography>
          <input
            style={{ display: "block" }}
            placeholder="Email..."
            onChange={(event) => setRegisterEmail(event.target.value)}
          />
          <input
            style={{ display: "block" }}
            placeholder="Password..."
            onChange={(event) => setRegisterPassword(event.target.value)}
          />

          <Button
            style={{ display: "block" }}
            variant="contained"
            color="primary"
            onClick={registerHandler}
          >
            Create user
          </Button>
        </Box>
      </Grid>
      <Grid direction="column" item container xs={12}>
        <Box mt={3}>
          <Typography variant="h5">Login</Typography>
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

          <Button variant="contained" color="primary" onClick={loginHandler}>
            Login
          </Button>
        </Box>
      </Grid>
      <Grid item container xs={12}>
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
      </Grid>
    </Grid>
  );
}

export default Login;
