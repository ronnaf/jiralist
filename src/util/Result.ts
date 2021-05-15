/**
 * A type used for representing a failable result.
 */
export type Result<T, E> =
  | {
      success: true;
      failure: false;
      value: T;
      error?: undefined;
      map: <U>(transform: (value: T) => U) => Result<U, E>;
      mapError: <F>(transform: (error: E) => F) => Result<T, F>;
    }
  | {
      success: false;
      failure: true;
      value?: undefined;
      error: E;
      map: <U>(transform: (value: T) => U) => Result<U, E>;
      mapError: <F>(transform: (error: E) => F) => Result<T, F>;
    };

export const Result = {
  /** Creates a Result success object. */
  success: <T, E>(value: T): Result<T, E> => {
    return {
      success: true,
      failure: false,
      value: value,
      map: transform => Result.success(transform(value)),
      mapError: () => Result.success(value),
    };
  },
  /** Creates a Result failure object. */
  failure: <T, E>(error: E): Result<T, E> => {
    return {
      success: false,
      failure: true,
      error: error,
      map: () => Result.failure(error),
      mapError: transform => Result.failure(transform(error)),
    };
  },
};
