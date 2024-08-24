export type Rating = 1 | 2 | 3 | 4 | 5;

export interface ProductReview {
  reviewComment: string;
  rating: Rating;
  isRecommended: boolean;
}
