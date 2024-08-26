import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  ProductReviewForm,
  ProductReviewFormControls,
} from './product-review-form';
import { UnsubscribeService } from '@app/shared/services/unsubscribe.service';
import { debounceTime, takeUntil } from 'rxjs';
import { ProductReviewStateService } from './product-review-state';
import { DEFAULT_DEBOUNCE_TIME } from '@app/shared/constants';
import { DetachedChangeDetection } from '@app/shared/helpers/detached-change-detection.class';
import { ErrorMessageRendererService } from '@app/shared/components/error-message-outlet/error-message-renderer.service';
import { TIME_LIMITED_TEMPLATE_TRIGGER } from '@app/shared/directives/time-limited-content-trigger.token';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  providers: [
    UnsubscribeService,
    ProductReviewStateService,
    {
      provide: TIME_LIMITED_TEMPLATE_TRIGGER,
      useFactory: (state: ProductReviewStateService) => {
        return state.getUpdatedProductReview$();
      },
      deps: [ProductReviewStateService],
    },
  ],
})
export class ProductReviewComponent
  extends DetachedChangeDetection
  implements OnInit, AfterViewInit
{
  productReviewForm = new ProductReviewForm();

  readonly formControls = ProductReviewFormControls;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private unsubscribe$: UnsubscribeService,
    private productReviewStateService: ProductReviewStateService,
    private errorMessagesRendererService: ErrorMessageRendererService
  ) {
    super(changeDetectorRef);
  }

  ngAfterViewInit(): void {
    this.detectChanges();
  }

  ngOnInit(): void {
    this.productReviewStateService
      .getProductReview()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((review) => {
        this.productReviewForm.setValue(review, { emitEvent: false });
        this.detectChanges();
      });

    this.productReviewForm.valueChanges
      .pipe(debounceTime(DEFAULT_DEBOUNCE_TIME), takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.errorMessagesRendererService.clearErrorMessage();
        this.productReviewStateService.updateProductReview(value);
      });
  }
}
