import { Box, Image, HStack, Avatar } from '@chakra-ui/react';
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
      <Avatar src={imageSrc} />
      <Box flexGrow={1}>{children}</Box>
    </HStack>
  );
}
