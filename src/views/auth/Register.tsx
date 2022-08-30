import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import useAuth from "src/hooks/useAuth";


function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const { user, registerEmailPassword, logout } = useAuth();


  const registerHandler = () => {
    registerEmailPassword(registerEmail, registerPassword);
  };

  return (
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
  );
}

export default Register;
