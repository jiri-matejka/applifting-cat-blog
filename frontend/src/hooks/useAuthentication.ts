import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const AUTH_TOKEN_STORAGE_KEY = 'auth_token';

export function useAuthentication() {
  const navigate = useNavigate();

  return {
    isAuthenticated: !!getAuthToken(),
    logout: useCallback(async () => {
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
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
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}
