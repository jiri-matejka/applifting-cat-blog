import { useAuthentication } from '@/hooks/useAuthentication';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

export function AuthenticatedSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthentication();

  return isAuthenticated ? (
    children
  ) : (
    <Alert status="error">
      <AlertIcon />
      <AlertDescription>You need to login to see this section</AlertDescription>
    </Alert>
  );
}
