import { Result, isError, isOk } from '@src/domain/result';
import { validate } from 'uuid';
import { Response } from 'express';
import { STATUS_CODES } from '@src/utils/httpStatusCodes';

export function isNonEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value.length > 0;
}

export function isUuid(value: unknown): boolean {
  return typeof value === 'string' && validate(value);
}

export function sendResultToResponse(
  result: Result,
  res: Response,
  codeForOk: number = STATUS_CODES.OK,
) {
  if (isError(result)) {
    if (result.message) res.statusMessage = result.message;
    res.sendStatus(result.code);
  } else if (isOk(result)) {
    res.sendStatus(codeForOk);
  }
}
