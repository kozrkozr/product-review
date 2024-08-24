import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessageProducer } from '@app/shared/helpers/http-error-message-producer.class';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  errorMessageProducer = new HttpErrorMessageProducer();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.errorMessageProducer.generateErrorMessage(
          error.status
        );

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
