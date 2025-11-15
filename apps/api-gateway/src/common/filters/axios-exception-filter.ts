import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';

@Catch(AxiosError)
export class AxiosExceptionFilter<T extends AxiosError>
  implements ExceptionFilter<T>
{
  catch(exception: T, host: ArgumentsHost) {
    console.log(exception);
    const response = host.switchToHttp().getResponse<Response>();

    return response
      .status(exception.response?.status || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: exception.message,
        description: {
          code: exception.code ?? 'No error code',
          name: exception.name,
        },
      });
  }
}
