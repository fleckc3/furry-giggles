import {
  Box,
  Container,
  Divider,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Stack,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FeatureIconRow from './components/FeatureIconRow';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = ['Create profile', 'Create group'];

function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Container>
        <Box sx={{ mt: 3 }}>
          <Typography color="primary" textAlign="center" variant="h4">
            Welcome to Gigiddy
          </Typography>
          <FeatureIconRow />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Stepper sx={{ mb: 2 }} activeStep={step} alternativeLabel>
          {steps.map(label => {
            let show = false;
            if (label === steps[1]) {
              show = true;
            }
            return (
              <Step key={label}>
                <StepLabel>
                  {label}{' '}
                  {show && (
                    <Typography fontSize="10px" sx={{ color: '#787878' }}>
                      (optional)
                    </Typography>
                  )}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {step === 0 && <Step1 onNextStep={setStep} />}
        {step === 1 && <Step2 onNextStep={setStep} />}
        {step === 2 && (
          <Stack>
            <Typography variant="h4" textAlign="center">
              Thank you!
            </Typography>
            <Button
              startIcon={<HomeIcon />}
              sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
              variant="contained"
              onClick={() => navigate('/home')}
            >
              Home
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default Onboarding;
