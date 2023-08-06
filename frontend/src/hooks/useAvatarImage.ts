import { useAuthentication } from './useAuthentication';

export function useAvatarImage() {
  const { isAuthenticated } = useAuthentication();

  return getAvatarImage(isAuthenticated);
}

export function getAvatarImage(isAuthenticated: boolean) {
  return isAuthenticated ? '/avatar.jpg' : '/anonymous.jpg';
}
