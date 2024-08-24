import { Injectable } from '@angular/core';
import { ProductReviewService } from './product-review.service';
import {
  merge,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ProductReview } from './product-review.model';
import { UnsubscribeService } from '@app/shared/services/unsubscribe.service';
import { ErrorMessageRendererService } from '@app/shared/components/error-message-outlet/error-message-renderer.service';

@Injectable()
export class ProductReviewStateService {
  private updatedProductReview$ = new ReplaySubject<ProductReview>(1);

  private updateProductReviewAction$ = new Subject<ProductReview>();

  constructor(
    private productReviewService: ProductReviewService,
    private unsubscribe$: UnsubscribeService,
    private errorMessagesRendererService: ErrorMessageRendererService
  ) {
    this.initUpdateAction();
  }

  initUpdateAction(): void {
    this.updateProductReviewAction$
      .pipe(
        switchMap((productReview) =>
          this.productReviewService
            .updateProductReview(productReview)
            .pipe(this.errorMessagesRendererService.catchError())
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((review) => {
        this.updatedProductReview$.next(review);
      });
  }

  getProductReview(): Observable<ProductReview> {
    const initialProductReview$ = this.productReviewService.getProductReview();

    return merge(initialProductReview$, this.updatedProductReview$);
  }

  getUpdatedProductReview$(): Observable<ProductReview> {
    return this.updatedProductReview$;
  }

  updateProductReview(productReview: ProductReview): void {
    this.updateProductReviewAction$.next(productReview);
  }
}
