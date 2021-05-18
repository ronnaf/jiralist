/**
 * A type used for representing a failable result.
 */
export type ResultType<T, E> =
  | {
      success: true;
      failure: false;
      value: T;
      error?: undefined;
      map: <U>(transform: (value: T) => U) => ResultType<U, E>;
      mapError: <F>(transform: (error: E) => F) => ResultType<T, F>;
    }
  | {
      success: false;
      failure: true;
      value?: undefined;
      error: E;
      map: <U>(transform: (value: T) => U) => ResultType<U, E>;
      mapError: <F>(transform: (error: E) => F) => ResultType<T, F>;
    };

export const Result = {
  /** Creates a Result success object. */
  success: <T, E>(value: T): ResultType<T, E> => {
    return {
      success: true,
      failure: false,
      value: value,
      map: transform => Result.success(transform(value)),
      mapError: () => Result.success(value),
    };
  },
  /** Creates a Result failure object. */
  failure: <T, E>(error: E): ResultType<T, E> => {
    return {
      success: false,
      failure: true,
      error: error,
      map: () => Result.failure(error),
      mapError: transform => Result.failure(transform(error)),
    };
  },
};
