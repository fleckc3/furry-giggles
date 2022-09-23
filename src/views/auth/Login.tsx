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
import TextFieldInput from 'src/components/rhf-inputs/TextFieldInput';
import { EmailInput } from 'src/components/rhf-inputs';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import { useForm, FormProvider } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const { handleSubmit } = methods;

  const { loginEmailPassword } = useAuth();

  const loginHandler = async (formValues: {
    email: string;
    password: string;
  }) => {
    const { email, password } = formValues;
    const response: string = await loginEmailPassword(email, password);
    if (response === 'SUCCESS') {
      enqueueSnackbar(`Welcome back ${email}`, { variant: 'success' });
      navigate('/home');
    } else {
      if (
        response.includes('auth/user-not-found') ||
        response.includes('auth/wrong-password')
      ) {
        enqueueSnackbar('Incorrect email or password', {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(response, {
          variant: 'error',
        });
      }
    }
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
          <CardHeader title="Login" />
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
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2 }}>
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
              <Link style={{ textDecoration: 'none' }} to="/register">
                <Typography textAlign="center" color="primary" gutterBottom>
                  Click here to register!
                </Typography>
              </Link>
            </form>
          </FormProvider>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
