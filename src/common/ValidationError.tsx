import { Text } from '@chakra-ui/react';

export function ValidationError({ text }: { text: string }) {
  return <Text color="red.600">{text}</Text>;
}

export function RequiredValidationError() {
  return ValidationError({ text: 'This field is required' });
}
