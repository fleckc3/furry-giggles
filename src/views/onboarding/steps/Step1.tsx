import {
  Box,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Avatar,
  Button,
  Typography,
  Divider,
  CardActions,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldInput from 'src/components/rhf-inputs/TextFieldInput';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { FormProvider } from 'src/components/rhf-inputs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useForm } from 'react-hook-form';
import { storage } from 'src/firebase-config';
import { SUCCESS } from 'src/constants';
import React, { useEffect, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';

type FormValues = {
  userName: string;
};

type Step1Props = {
  onNextStep: (arg0: number) => void;
};

function Step1({ onNextStep }: Step1Props) {
  const { onBoardUser }: any = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: {
      userName: '',
    },
    mode: 'onBlur',
  });

  const { handleSubmit } = methods;

  const isValidImageUploaded = (image: File) => {
    const validExtensions = ['png', 'jpeg', 'jpg'];
    const fileExtension = image.type.split('/')[1];
    return validExtensions.includes(fileExtension);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let image;
    if (event?.target?.files![0]) {
      image = event?.target?.files[0];

      if (isValidImageUploaded(image)) {
        setImage(image);
      }
    }
  };

  useEffect(() => {
    if (!image) {
      return;
    }
    const imageUrl = URL.createObjectURL(image);
    setPreview(imageUrl);
  }, [image]);

  const handleUpdateProfile = async (formValues: FormValues) => {
    const { userName } = formValues;
    let response = '';
    if (image) {
      setLoading(true);
      const imageRef = ref(storage, `${userName}-profileImage`);

      try {
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        response = await onBoardUser(userName, url);

        setImage(null);
        setLoading(false);
      } catch (error) {
        const snack = enqueueSnackbar(error.message, {
          variant: 'error',
          onClick: () => closeSnackbar(snack),
        });
        setLoading(false);
      }
    } else {
      response = await onBoardUser(userName);
    }

    if (response === SUCCESS) {
      const message = `Username ${image ? 'and image ' : ''} updated`;
      const snack = enqueueSnackbar(message, {
        variant: 'success',
        onClick: () => closeSnackbar(snack),
      });
      setShowNext(true);
    } else {
      const snack = enqueueSnackbar(response, {
        variant: 'error',
        onClick: () => closeSnackbar(snack),
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        sx={{
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <FormProvider methods={methods}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {loading ? (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '140px',
                        width: '140px',
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Avatar
                      sx={{
                        height: '140px',
                        width: '140px',
                      }}
                      src={preview ? preview : ''}
                    >
                      {!preview && (
                        <AccountCircleIcon
                          sx={{
                            height: '155px',
                            width: '155px',
                          }}
                        />
                      )}
                    </Avatar>
                  )}
                </Box>

                <Box display="flex-column">
                  <Button
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    variant="outlined"
                    component="label"
                  >
                    <input hidden type="file" onChange={handleImageChange} />
                    Choose image
                  </Button>

                  <Typography
                    textAlign="center"
                    fontSize="10px"
                    sx={{ color: '#787878', mt: 0 }}
                  >
                    (Optional)
                  </Typography>
                </Box>

                <Divider />
                <TextFieldInput
                  name="userName"
                  variant="outlined"
                  size="small"
                  label="Create Username"
                  required
                  fullWidth
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant={showNext ? 'outlined' : 'contained'}
                color="primary"
                type="submit"
                onClick={handleSubmit(handleUpdateProfile)}
              >
                Update profile
              </Button>
            </CardActions>
          </Card>
        </FormProvider>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          endIcon={<ArrowRightIcon />}
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => onNextStep(1)}
          disabled={!showNext}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default Step1;
