import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import GroupsIcon from '@mui/icons-material/Groups';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StackedIconText from './components/StackedIconText';
import TextFieldInput from 'src/components/rhf-inputs/TextFieldInput';
import { storage } from 'src/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useForm, FormProvider } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import { SetStateAction, useState } from 'react';

type FormValues = {
  userName: string;
};

function Onboarding() {
  const { updateUserProfile }: any = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  const methods = useForm({
    defaultValues: {
      userName: '',
    },
    mode: 'onBlur',
  });

  const { handleSubmit } = methods;

  const iconsWithText = [
    {
      icon: <ForumIcon color="primary" />,
      text: 'Chat',
    },
    {
      icon: <EventNoteIcon color="primary" />,
      text: 'Schedule',
    },
    {
      icon: <DescriptionIcon color="primary" />,
      text: 'Invoice',
    },
    {
      icon: <GroupsIcon color="primary" />,
      text: 'Manage',
    },
  ];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files![0]) {
      setImage(event?.target?.files[0]);
    }
  };

  const handleAddUserName = async (formValues: FormValues) => {
    const { userName } = formValues;
    if (image) {
      const imageRef = ref(storage, `${userName}-profileImage`);
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then(url => {
              setUrl(url);
            })
            .catch(error => {
              console.log(error.message, 'Error getting image URL');
            });
          setImage(null);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
    const response = await updateUserProfile(userName);
  };
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Container>
        <Box sx={{ mt: 3 }}>
          <Typography color="primary" textAlign="center" variant="h4">
            Welcome to Gigiddy!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Stack
              spacing={2}
              direction="row"
              divider={
                <Divider
                  variant="inset"
                  orientation="vertical"
                  flexItem
                  sx={{ height: '25px', borderColor: 'primary.main' }}
                />
              }
            >
              {iconsWithText.map(item => {
                return (
                  <StackedIconText
                    key={item.text}
                    icon={item.icon}
                    text={item.text}
                  />
                );
              })}
            </Stack>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />

        <Box
          display="flex"
          sx={{
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <FormProvider {...methods}>
            <form>
              <Card>
                <CardHeader title="Create a profile" />
                <CardContent sx={{ pt: 0 }}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Avatar
                        sx={{
                          height: '140px',
                          width: '140px',
                        }}
                        src={url ? url : ''}
                      >
                        {!url && (
                          <AccountCircleIcon
                            sx={{
                              height: '155px',
                              width: '155px',
                            }}
                          />
                        )}
                      </Avatar>
                    </Box>

                    <Box display="flex-column">
                      <Button
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                        variant="outlined"
                        component="label"
                      >
                        <input
                          hidden
                          type="file"
                          onChange={handleImageChange}
                        />
                        Choose image
                      </Button>

                      <Typography
                        textAlign="center"
                        fontSize="10px"
                        sx={{ color: '#787878', mt: 0 }}
                      >
                        optional
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
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit(handleAddUserName)}
                  >
                    Next
                  </Button>
                </CardActions>
              </Card>
            </form>
          </FormProvider>
        </Box>
      </Container>
    </Box>
  );
}

export default Onboarding;
