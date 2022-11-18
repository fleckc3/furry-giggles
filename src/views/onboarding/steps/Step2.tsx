import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldInput from 'src/components/rhf-inputs/TextFieldInput';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'src/firebase-config';
import FormProvider from 'src/components/rhf-inputs/FormProvider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import { useEffect, useState } from 'react';

interface FormValues {
  groupName: string;
}

type Step2Props = {
  onNextStep: (arg0: number) => void;
};

function Step2({ onNextStep }: Step2Props) {
  const { user } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      groupName: '',
    },
  });
  const { handleSubmit, watch } = methods;
  const name = watch('groupName');
  const avatarText = name ? name.charAt(0) : 'G';

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

  const handleCreateGroup = async (formaValues: FormValues) => {
    const { groupName } = formaValues;

    try {
      await addDoc(collection(db, 'groups'), {
        admin: user!.uid,
        name: groupName,
      });
      onNextStep(2);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      display="flex"
      sx={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Card>
        <FormProvider methods={methods}>
          <CardContent>
            <TextFieldInput
              name="groupName"
              variant="outlined"
              size="small"
              label="Group name"
              required
              fullWidth
            />
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography>Default group image:</Typography>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <Avatar
                  sx={{
                    height: '60px',
                    width: '60px',
                    bgcolor: 'primary.main',
                  }}
                  src={preview ? preview : ''}
                >
                  {!preview && avatarText}
                </Avatar>
                <Box>
                  <Button
                    startIcon={<CloudUploadIcon />}
                    variant="outlined"
                    component="label"
                  >
                    <input hidden type="file" onChange={handleImageChange} />
                    Add group image
                  </Button>

                  <Typography
                    textAlign="center"
                    fontSize="10px"
                    sx={{ color: '#787878', mt: 0 }}
                  >
                    (Optional)
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit(handleCreateGroup)}
            >
              Create Group
            </Button>
          </CardActions>
        </FormProvider>
      </Card>
      <Box
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
      >
        <Button
          startIcon={<ArrowLeftIcon />}
          sx={{ mt: 2 }}
          onClick={() => onNextStep(0)}
        >
          Back
        </Button>
        <Button
          endIcon={<ArrowRightIcon />}
          sx={{ mt: 2 }}
          onClick={() => navigate('/home')}
        >
          Skip
        </Button>
      </Box>
    </Box>
  );
}

export default Step2;
