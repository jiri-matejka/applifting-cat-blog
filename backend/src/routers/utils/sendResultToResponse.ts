import { Result, isError, isOk } from '@src/utils/result';
import { Response } from 'express';
import { STATUS_CODES, statusCodeType } from '@src/utils/httpStatusCodes';

export function sendResultToResponse<T extends { code?: statusCodeType }>(
  result: Result<T>,
  res: Response,
  codeForOk: number = STATUS_CODES.OK,
) {
  if (isError(result)) {
    if (result.message) res.statusMessage = result.message;
    res.sendStatus(result.code);
  } else if (isOk(result)) {
    res.sendStatus(result.value?.code ?? codeForOk);
  }
}
