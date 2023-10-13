import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class PagingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const query = request.query;
    if (!query.page || query.page <= 0)
      throw new HttpException(
        'Please give a valid value for the page Query param!',
        HttpStatus.BAD_REQUEST,
      );
    return next.handle().pipe(
      map((value) => ({
        Page: query.page,
        Todos: value,
      })),
    );
  }
}
