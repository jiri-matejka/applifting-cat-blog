import { publicApi } from '@/api/axiosConfig';
import { useAuthentication } from '@/hooks/useAuthentication';
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
    publicApi.post('/auth/login', data).then(
      (response) => {
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
