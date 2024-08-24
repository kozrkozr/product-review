import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app.routes';

const routes: Routes = [
  {
    path: '**',
    redirectTo: AppRoutes.ProductReview,
  },
  {
    path: AppRoutes.ProductReview,
    loadChildren: () =>
      import('@pages/product-review/product-review.module').then(
        (m) => m.ProductReviewModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
