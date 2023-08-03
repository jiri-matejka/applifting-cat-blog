//export type SimpleResult<E extends string = string> = Ok<void> | Error<E>;

//export type ComplexResult<E = string> = Ok | ComplexError<E>;

export type ErrorCodeAndMessage = { code: number; message: string };

type Ok = {
  readonly tag: 'Ok';
  //readonly value: T;
};

// type ComplexError<E> = {
//   readonly tag: 'Error';
//   readonly error: E;
// };

export type Result = Ok | Error;
export type Error = {
  readonly tag: 'Error';
  readonly code: number;
  readonly message: string;
};

export function ok(): Ok {
  return { tag: 'Ok' };
}

export function error(error: ErrorCodeAndMessage): Error {
  return { tag: 'Error', ...error };
}

export function isOk(result: Result): result is Ok {
  return result.tag === 'Ok';
}

export function isError(result: Result): result is Error {
  return result.tag === 'Error';
}
