import { publicApi } from '@/api/axiosConfig';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const IS_AUTHENTICATED_COOKIE_KEY = 'is_authenticated';

export function useAuthentication() {
  const navigate = useNavigate();

  return {
    isAuthenticated: getCookieValue(IS_AUTHENTICATED_COOKIE_KEY) === 'true',
    logout: useCallback(async () => {
      await publicApi.post('/auth/logout');
      // this is for simplicity, it could be improved to redirect to root
      // only if we are on backoffice page
      navigate('/');
    }, [navigate]),
  };
}

function getCookieValue(name: string): string | null {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
