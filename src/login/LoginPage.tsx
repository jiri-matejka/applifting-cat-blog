import { publicApi } from '@/api/axiosConfig';
import { API_KEY } from '@/api/constants';
import {
  LOCAL_STORAGE_TOKEN_KEY as LOCAL_STORAGE_TOKEN_KEY,
  useAuthentication,
} from '@/hooks/useAuthentication';
import { getMyArticlesRoute } from '@/routing/routes';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
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

type LoginResponse = {
  access_token: string;
  expires_in: number;
  token_type: 'bearer';
};

export function LoginPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const navigate = useNavigate();
  const { isAuthenticated } = useAuthentication();

  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getMyArticlesRoute());
    }
  }, [isAuthenticated]);

  const onSubmit = (data: LoginFormData) => {
    setErrorText(null);
    publicApi
      .post('/login', data, {
        headers: {
          'X-API-KEY': API_KEY,
        },
      })
      .then(
        (response) => {
          localStorage.setItem(
            LOCAL_STORAGE_TOKEN_KEY,
            response.data.access_token,
          );
          navigate(getMyArticlesRoute());
        },
        ({
          message,
          response: {
            data: { message: apiMessage },
          },
        }) => {
          setErrorText(apiMessage ?? message ?? 'Unknown error occured');
        },
      );
  };

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
            {/* <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input required {...register('email')} />
            </FormControl> */}

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
            {/*
            <FormControl id="password" isRequired>
               required {...register('password')} />
            </FormControl> */}
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
}
