import { NgModule } from '@angular/core';
import { TimeLimitedContentComponent } from './time-limited-content.component';
import { NgIf } from '@angular/common';

@NgModule({
  imports: [NgIf],
  declarations: [TimeLimitedContentComponent],
  exports: [TimeLimitedContentComponent],
})
export class TimeLimitedContentModule {}
