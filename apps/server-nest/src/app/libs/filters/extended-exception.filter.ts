import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ApiErrRes } from '@libs/api-interface';

@Catch()
export class ExtendedExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log('ExtendedExceptionFilter');
    console.log('exception', exception.name);
    console.log('status', status);
    console.log('exception', exception);

    let errorResponse: ApiErrRes;

    switch (exception.name) {
      case 'Unauthorized': {
        errorResponse = {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        Logger.error(`🚀 Unauthorized: ${exception.message}, Timestamp:  ${errorResponse.timestamp}`);
        break;
      }

      case 'NotFoundException': {
        errorResponse = {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Not Found',
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        Logger.error(`🚀 MongoServerError: ${exception.message}, Timestamp:  ${errorResponse.timestamp}`);
        break;
      }

      case 'MongoServerError': {
        errorResponse = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Bad Request',
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        Logger.error(`🚀 MongoServerError: ${exception.message}, Timestamp:  ${errorResponse.timestamp}`);
        break;
      }

      default: {
        errorResponse = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Error',
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        Logger.error(`🚀 Error: ${exception.message}, Timestamp:  ${errorResponse.timestamp}`);
        break;
      }
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
