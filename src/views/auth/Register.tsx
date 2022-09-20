import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { EmailInput } from 'src/components/rhf-inputs';
import { Link } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import { useForm, FormProvider } from 'react-hook-form';
import TextFieldInput from 'src/components/rhf-inputs/TextFieldInput';

function Register() {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const { handleSubmit } = methods;

  const { registerEmailPassword } = useAuth();

  const registerHandler = (formValues: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { email, password } = formValues;
    registerEmailPassword(email, password);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardHeader title="Register" />
          <FormProvider {...methods}>
            <form>
              <CardContent>
                <Stack spacing={2}>
                  <EmailInput name="email" size="small" required />

                  <TextFieldInput
                    name="password"
                    variant="outlined"
                    size="small"
                    label="Password"
                    type="password"
                    required
                    fullWidth
                  />

                  <TextFieldInput
                    name="confirmPassword"
                    variant="outlined"
                    size="small"
                    label="Confirm Password"
                    type="password"
                    required
                    fullWidth
                  />
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  onClick={handleSubmit(registerHandler)}
                >
                  Register
                </Button>
              </CardActions>
              <Link style={{ textDecoration: 'none' }} to="/login">
                <Typography textAlign="center" color="primary" gutterBottom>
                  Click here to login!
                </Typography>
              </Link>
            </form>
          </FormProvider>
        </Card>
      </Container>
    </Box>
  );
}

export default Register;
