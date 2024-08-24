import { FormControl, FormGroup } from '@angular/forms';

export enum ProductReviewFormControls {
  ReviewComment = 'reviewComment',
  Rating = 'rating',
  IsRecommended = 'isRecommended',
}

export class ProductReviewForm extends FormGroup {
  constructor() {
    super({
      [ProductReviewFormControls.ReviewComment]: new FormControl(''),
      [ProductReviewFormControls.Rating]: new FormControl(3),
      [ProductReviewFormControls.IsRecommended]: new FormControl(false),
    });
  }
}
