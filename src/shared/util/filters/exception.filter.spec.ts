import { HttpExceptionFilter } from './exception.filter';
import { HttpException } from '@nestjs/common';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let response;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should catch an exception and return the appropriate response', () => {
    const exceptionStatus = 404;
    const exceptionResponse = 'Not Found';
    const exception = new HttpException(exceptionResponse, exceptionStatus);

    const host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(response),
    };

    filter.catch(exception, host as any);

    expect(response.status).toHaveBeenCalledWith(exceptionStatus);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: exceptionStatus,
      message: exceptionResponse,
    });
  });

  it('should handle a 500 internal server error', () => {
    const exceptionStatus = 500;
    const exceptionResponse = 'Internal Server Error';
    const exception = new HttpException(exceptionResponse, exceptionStatus);

    const host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(response),
    };

    filter.catch(exception, host as any);

    expect(response.status).toHaveBeenCalledWith(exceptionStatus);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: exceptionStatus,
      message: exceptionResponse,
    });
  });

  it('should handle a 400 bad request error', () => {
    const exceptionStatus = 400;
    const exceptionResponse = 'Bad Request';
    const exception = new HttpException(exceptionResponse, exceptionStatus);

    const host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(response),
    };

    filter.catch(exception, host as any);

    expect(response.status).toHaveBeenCalledWith(exceptionStatus);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: exceptionStatus,
      message: exceptionResponse,
    });
  });

  it('should handle a 401 unauthorized error', () => {
    const exceptionStatus = 401;
    const exceptionResponse = 'Unauthorized';
    const exception = new HttpException(exceptionResponse, exceptionStatus);

    const host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(response),
    };

    filter.catch(exception, host as any);

    expect(response.status).toHaveBeenCalledWith(exceptionStatus);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: exceptionStatus,
      message: exceptionResponse,
    });
  });

  it('should handle an exeption with an object response correctly', () => {
    const exceptionStatus = 400;
    const exceptionResponse = { error: 'Bad Request', detail: 'Missing parameter' };
    const exception = new HttpException(exceptionResponse, exceptionStatus);

    const host = {
        switchToHttp: jest.fn().mockReturnThis(),
        getResponse: jest.fn().mockReturnValue(response),
    };

    filter.catch(exception, host as any);

    expect(response.status).toHaveBeenCalledWith(exceptionStatus);
    expect(response.json).toHaveBeenCalledWith({
        statusCode: exceptionStatus,
        message: exceptionResponse,
    });
  });

});
