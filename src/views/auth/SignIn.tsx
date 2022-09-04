import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { EmailInput } from "src/components/rhf-inputs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import { useForm, FormProvider } from "react-hook-form";
import TextFieldInput from "src/components/rhf-inputs/TextFieldInput";

function SignIn() {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { handleSubmit } = methods;

  const { loginEmailPassword } = useAuth();

  const loginHandler = (formValues: { email: string; password: string }) => {
    const { email, password } = formValues;
    loginEmailPassword(email, password);
    navigate("/home");
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
              <CardHeader title="Signin" />
              <FormProvider {...methods}>
                <form>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <EmailInput name="email" size="small" required />
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldInput
                          name="password"
                          variant="outlined"
                          size="small"
                          label="Password"
                          type="password"
                          required
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      onClick={handleSubmit(loginHandler)}
                    >
                      Login
                    </Button>
                  </CardActions>
                  <Link style={{ textDecoration: "none" }} to="/register">
                    <Typography textAlign="center" color="primary" gutterBottom>
                      Click here to register!
                    </Typography>
                  </Link>
                </form>
              </FormProvider>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SignIn;
