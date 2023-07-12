import { HttpException, HttpStatus } from '@nestjs/common';

interface ErrorManage {
  errorcode?: number;
  message?: string;
  statuscode?: number;
}

export const ThrowError = (data: ErrorManage) => {
  throw new HttpException(data.message, data.errorcode);
};
