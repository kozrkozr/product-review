import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DetachedChangeDetection } from '@app/shared/helpers/detached-change-detection.class';
import { ErrorMessageRendererService } from './error-message-renderer.service';
import { UnsubscribeService } from '@app/shared/services/unsubscribe.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-error-message-outlet',
  template: `
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
      *ngIf="errorMessage"
    >
      <strong class="font-bold">Error: </strong>
      <span class="block sm:inline">{{ errorMessage }}</span>
    </div>
  `,
  providers: [UnsubscribeService],
})
export class ErrorMessageOutletComponent
  extends DetachedChangeDetection
  implements OnInit
{
  errorMessage?: string;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    public errorMessagesService: ErrorMessageRendererService,
    private unsubscribe$: UnsubscribeService
  ) {
    super(changeDetectorRef);
  }

  ngOnInit(): void {
    this.errorMessagesService.errorMessage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((error) => {
        this.errorMessage = error;

        this.detectChanges();
      });
  }
}
