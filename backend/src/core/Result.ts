/* eslint-disable @typescript-eslint/no-explicit-any */
export class Error<T> {
    readonly data: T;

    constructor(data: T) {
        this.data = data;
    }

    isError() {
        return true;
    }

    isSuccess() {
        return false;
    }
}

export class Success<T> {
    readonly data: T;

    constructor(data: T) {
        this.data = data;
    }

    isError() {
        return false;
    }

    isSuccess() {
        return true;
    }
}

export type Result<E, S> = Error<E> | Success<S>;

export const success = <E, S>(data: S): Result<E, S> => new Success(data);

export const error = <E, S>(data: E): Result<E, S> => new Error(data);
