import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

export function useAuthentication() {
  return {
    isAuthenticated: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) !== null,
    logout,
  };
}

function logout() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
}
