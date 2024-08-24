import { Injectable } from '@angular/core';
import { ProductReview } from './product-review.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductReviewService {
  readonly API_URL = '/api/productReview';

  constructor(private httpClient: HttpClient) {}

  getProductReview(): Observable<ProductReview> {
    return this.httpClient.get<ProductReview>(this.API_URL);
  }

  updateProductReview(productReview: ProductReview): Observable<ProductReview> {
    return this.httpClient.put<ProductReview>(this.API_URL, productReview);
  }
}
