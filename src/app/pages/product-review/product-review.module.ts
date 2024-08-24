import { NgModule } from '@angular/core';
import { ProductReviewComponent } from './product-review.component';
import { RouterModule } from '@angular/router';
import { ProductReviewService } from './product-review.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { TimeLimitedContentModule } from '@app/shared/components/time-limited-content/time-limited-content.module';
import { ErrorMessageOutletModule } from '@app/shared/components/error-message-outlet/error-message-outlet.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProductReviewComponent,
      },
    ]),
    ReactiveFormsModule,
    NgFor,
    TimeLimitedContentModule,
    ErrorMessageOutletModule,
  ],
  declarations: [ProductReviewComponent],
  providers: [ProductReviewService],
})
export class ProductReviewModule {}
