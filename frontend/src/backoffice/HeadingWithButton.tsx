import { Heading } from '@chakra-ui/react';

export function HeadingWithChildren({
  headingText,
  children,
}: {
  headingText: string;
  children: React.ReactNode;
}) {
  return (
    <Heading as="h1" pb="4" alignItems="start" display="flex" gap={6}>
      {headingText}
      {children}
    </Heading>
  );
}
