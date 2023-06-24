import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  success?: boolean | undefined;
  message: string;
  errorMessages: IGenericErrorMessage[];
  stack?: string;
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T | null;
};
