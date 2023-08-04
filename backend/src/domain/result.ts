export type ErrorCodeAndMessage = { code: number; message: string };

type Ok<TValue = void> = {
  readonly tag: 'Ok';
  readonly value?: TValue;
};

export type Result<TValue = void> = Ok<TValue> | Error;

export type Error = {
  readonly tag: 'Error';
  readonly code: number;
  readonly message?: string;
};
export type ResultWithData<T> = Ok<T> | Error;

export function ok<T>(value?: T): Ok<T> {
  return { tag: 'Ok', value };
}

// export function okWithData<T>(value: T): Ok<T> {
//   return { tag: 'Ok', value };
// }

export function error(error: ErrorCodeAndMessage): Error {
  return { tag: 'Error', ...error };
}

export function isOk<T>(result: Result<T>): result is Ok<T> {
  return result.tag === 'Ok';
}

// export function isOkWithData<T>(result: ResultWithData<T>): result is Ok<T> {
//   return result.tag === 'Ok';
// }

export function isError<T>(result: Result<T>): result is Error {
  return result.tag === 'Error';
}

// export function isErrorFromResultWithData<T>(
//   result: ResultWithData<T>,
// ): result is Error {
//   return result.tag === 'Error';
// }
