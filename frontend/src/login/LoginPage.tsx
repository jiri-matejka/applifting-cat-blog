import { publicApi } from '@/api/axiosConfig';
import { useAuthentication } from '@/hooks/useAuthentication';
import { getMyArticlesRoute } from '@/routing/routes';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { control, handleSubmit } = useForm<LoginFormData>();

  const navigate = useNavigate();
  const { isAuthenticated, saveAuthToken } = useAuthentication();

  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getMyArticlesRoute());
    }
  }, [isAuthenticated]);

  return (
    <Flex align={'center'} justify={'center'} py={4} px={6}>
      <Box rounded={'lg'} boxShadow={'2xl'} p={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={8}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input {...field} />
                  </FormControl>
                );
              }}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                </FormControl>
              )}
            />
            <Stack spacing={6}>
              <Button type="submit" colorScheme="blue">
                Log in
              </Button>
              {errorText && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{errorText}</AlertDescription>
                </Alert>
              )}
            </Stack>
          </Stack>
        </form>
      </Box>
    </Flex>
  );

  function onSubmit(data: LoginFormData) {
    setErrorText(null);
    publicApi
      .post('/auth/login', data)
      .then(
        ({ data: { auth_token } }) => {
          if (!auth_token) {
            setErrorText('No authentication token received');
            return;
          }
          saveAuthToken(auth_token);
          navigate(getMyArticlesRoute());
        },
        ({
          message,
          response: {
            data: { message: apiMessage },
            status,
          },
        }) => {
          const resultMessage =
            status === 401
              ? 'Invalid username or password'
              : apiMessage ?? message ?? 'Unknown error occured';
          setErrorText(resultMessage);
        },
      )
      .catch(() => {
        setErrorText('Error during login');
      });
  }
}
