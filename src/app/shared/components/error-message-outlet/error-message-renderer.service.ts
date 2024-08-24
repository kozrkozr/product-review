import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable } from 'rxjs';

@Injectable()
export class ErrorMessageRendererService {
  errorMessage$ = new BehaviorSubject<string | undefined>('');

  setErrorMessage(errorMessage: string): void {
    this.errorMessage$.next(errorMessage);
  }

  clearErrorMessage(): void {
    this.errorMessage$.next('');
  }

  catchError<T>(): (source: Observable<T>) => Observable<T> {
    return catchError((error: Error) => {
      if (typeof error?.message === 'string') {
        this.setErrorMessage(error.message);
      }

      return EMPTY;
    });
  }
}
