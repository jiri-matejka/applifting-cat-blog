import { Flex, Spinner } from '@chakra-ui/react';
import { Suspense, type ReactNode } from 'react';

export function SuspenseRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

function Loader() {
  return (
    <Flex justifyContent="center" alignItems="center" pt="4">
      <Spinner size="lg" />
    </Flex>
  );
}
