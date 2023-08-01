import {
  Alert,
  AlertDescription,
  AlertIcon,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import type React from 'react';

export function ApiFetchedContent({
  isLoading,
  isError,
  children,
  errorText,
}: {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
  errorText: string;
}) {
  return isError ? (
    <Alert status="error">
      <AlertIcon />
      <AlertDescription>{errorText}</AlertDescription>
    </Alert>
  ) : isLoading ? (
    <Flex justifyContent="center" alignItems="center" pt="4">
      <Spinner size="lg" />
    </Flex>
  ) : (
    children
  );
}
