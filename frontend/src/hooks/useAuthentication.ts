import { publicApi } from '@/api/axiosConfig';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const AUTH_TOKEN_STORAGE_KEY = 'auth_token';

export function useAuthentication() {
  const navigate = useNavigate();

  return {
    isAuthenticated: !!getAuthToken(),
    logout: useCallback(async () => {
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      publicApi.defaults.headers.common.Authorization = undefined;
      // this is for simplicity, it could be improved to redirect to root
      // only if we are on backoffice page
      navigate('/');
    }, [navigate]),
    saveAuthToken,
  };
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

function saveAuthToken(token: string) {
  // TODO: here it would be needed to validate the token

  publicApi.defaults.headers.common.Authorization = `Bearer ${token}`;

  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}
