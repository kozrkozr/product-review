import { NgModule } from '@angular/core';
import { ProductReviewComponent } from './product-review.component';
import { RouterModule } from '@angular/router';
import { ProductReviewService } from './product-review.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ErrorMessageOutletModule } from '@app/shared/components/error-message-outlet/error-message-outlet.module';
import { TimeLimitedTemplateModule } from '@app/shared/directives/time-limited-template.module';

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
    ErrorMessageOutletModule,
    TimeLimitedTemplateModule,
  ],
  declarations: [ProductReviewComponent],
  providers: [ProductReviewService],
})
export class ProductReviewModule {}
