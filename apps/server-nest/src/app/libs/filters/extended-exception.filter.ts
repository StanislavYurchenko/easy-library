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
      case 'ForbiddenError': {
        errorResponse = {
          statusCode: status,
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        Logger.error(`🚀 ForbiddenError: ${exception.message}, Timestamp:  ${errorResponse.timestamp}`);
        break;
      }

      case 'ForbiddenException': {
        errorResponse = {
          statusCode: status,
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        Logger.error(`🚀 ForbiddenException: ${exception.message}, Timestamp:  ${errorResponse.timestamp}`);
        break;
      }

      case 'BadRequestException': {
        errorResponse = {
          statusCode: status,
          message: exception.response.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        Logger.error(`🚀 BadRequestException: ${exception.message}, Timestamp:  ${errorResponse.timestamp}`);
        break;
      }

      case 'UnauthorizedException': {
        errorResponse = {
          statusCode: status,
          message: 'Unauthorized',
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        Logger.error(`🚀 UnauthorizedException: ${exception.message}, Timestamp:  ${errorResponse.timestamp}`);
        break;
      }

      case 'NotFoundException': {
        errorResponse = {
          statusCode: status,
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        Logger.error(`🚀 NotFoundException: ${exception.message}, Timestamp:  ${errorResponse.timestamp}`);
        break;
      }

      case 'MongoServerError': {
        errorResponse = {
          statusCode: status,
          message: 'Bad Request',
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        Logger.error(`🚀 MongoServerError: ${exception.message}, Timestamp:  ${errorResponse.timestamp}`);
        break;
      }

      default: {
        errorResponse = {
          statusCode: status,
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
