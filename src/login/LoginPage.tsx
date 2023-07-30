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
} from '@chakra-ui/react';

export function LoginPage() {
  return (
    <Flex align={'center'} justify={'center'} py={4} px={6}>
      <Box rounded={'lg'} boxShadow={'2xl'} p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={10}>
            <Button colorScheme="blue">Log in</Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
