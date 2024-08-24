import { NgModule } from '@angular/core';
import { ErrorMessageOutletComponent } from './error-message-outlet.component';
import { ErrorMessageRendererService } from './error-message-renderer.service';
import { AsyncPipe, NgIf } from '@angular/common';

@NgModule({
  imports: [NgIf, AsyncPipe],
  declarations: [ErrorMessageOutletComponent],
  exports: [ErrorMessageOutletComponent],
  providers: [ErrorMessageRendererService],
})
export class ErrorMessageOutletModule {}
