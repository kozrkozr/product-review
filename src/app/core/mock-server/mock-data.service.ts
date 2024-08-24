import {
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { of } from 'rxjs';

export class MockDataService implements InMemoryDbService {
  private productReview = {
    reviewComment: '',
    rating: 3,
    isRecommended: false,
  };

  createDb() {
    return {
      productReview: this.productReview,
    };
  }

  put(requestInfo: RequestInfo) {
    // @ts-ignore
    this.productReview = requestInfo.req.body;

    // Uncomment the next line to simulate HTTP errors

    // return this.createRandomHttpErrorResponse(requestInfo);

    return of(
      new HttpResponse({ body: { ...this.productReview }, status: 401 })
    );
  }

  createRandomHttpErrorResponse(requestInfo: RequestInfo) {
    const errorTypes = [
      {
        status: 400,
        statusText: 'Bad Request',
        message: 'Please check your input.',
      },
      {
        status: 401,
        statusText: 'Unauthorized',
        message: 'Please login to access this resource.',
      },
      {
        status: 403,
        statusText: 'Forbidden',
        message: 'Access denied to this resource.',
      },
      { status: 404, statusText: 'Not Found', message: 'Hero not found.' },
      {
        status: 500,
        statusText: 'Internal Server Error',
        message: 'Something went wrong on the server.',
      },
      {
        status: 503,
        statusText: 'Service Unavailable',
        message: 'Service is currently unavailable.',
      },
      {
        status: 504,
        statusText: 'Gateway Timeout',
        message: 'Gateway timed out. Please try again later.',
      },
    ];

    const randomError =
      errorTypes[Math.floor(Math.random() * errorTypes.length)];

    return requestInfo.utils.createResponse$(() => {
      const options = {
        body: { error: randomError.message },
        status: randomError.status,
        statusText: randomError.statusText,
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
      return options;
    });
  }
}
