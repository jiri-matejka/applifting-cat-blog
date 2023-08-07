import { validate } from 'uuid';

export function isNonEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value.length > 0;
}

export function isUuid(value: unknown): boolean {
  return typeof value === 'string' && validate(value);
}
