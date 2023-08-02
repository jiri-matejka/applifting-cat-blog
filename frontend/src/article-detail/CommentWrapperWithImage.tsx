import { Box, Image, HStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export function CommentWrapperWithImage({
  imageSrc,
  children,
}: {
  imageSrc: string;
  children: ReactNode;
}) {
  return (
    <HStack alignItems="start" mb={5}>
      <Image rounded="full" src={imageSrc} boxSize={10} />
      <Box flexGrow={1}>{children}</Box>
    </HStack>
  );
}
