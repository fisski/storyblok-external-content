export type ManualPromise<TResult = any> = Promise<TResult> & {
  resolve: (value: TResult) => Promise<TResult>;
  reject: (error?: Error) => Promise<TResult>;
};

export function createPromise<TResult>(): ManualPromise<TResult> {
  const noop = (value: TResult) => value;
  const scope: any = {};
  const result: any = new Promise<TResult>((resolve, reject) => {
    scope.resolve = resolve;
    scope.reject = reject;
  });

  result.resolve = (value: TResult) => {
    scope.resolve(value);
    return result.then(noop);
  };

  result.reject = (error?: Error) => {
    scope.reject(error);
    return result.then(noop, noop);
  };

  return result;
}
