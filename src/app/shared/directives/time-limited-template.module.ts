import { NgModule } from '@angular/core';
import { TimeLimitedTemplateDirective } from './time-limited-template.directive';

@NgModule({
  declarations: [TimeLimitedTemplateDirective],
  exports: [TimeLimitedTemplateDirective],
})
export class TimeLimitedTemplateModule {}
