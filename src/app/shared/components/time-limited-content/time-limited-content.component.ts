import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { UnsubscribeService } from '@app/shared/services/unsubscribe.service';
import { TIME_LIMITED_CONTENTS_TRIGGER } from './time-limited-content-trigger.token';
import { Subject, switchMap, takeUntil, timer } from 'rxjs';
import { DetachedChangeDetection } from '@app/shared/helpers/detached-change-detection.class';

const DEFAULT_DISPLAYED_TIME = 3000;

@Component({
  selector: 'app-time-limited-content',
  template: `
    <ng-container *ngIf="isVisible">
      <ng-content></ng-content>
    </ng-container>
  `,
  providers: [UnsubscribeService],
})
export class TimeLimitedContentComponent
  extends DetachedChangeDetection
  implements OnChanges, AfterViewInit
{
  @Input() time: number = DEFAULT_DISPLAYED_TIME;
  @Input() trigger: boolean = false;

  trigger$: Subject<void>;

  isVisible: boolean = false;

  constructor(
    @Optional()
    @Inject(TIME_LIMITED_CONTENTS_TRIGGER)
    trigger$: Subject<void>,
    private unsubcribe$: UnsubscribeService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(changeDetectorRef);

    this.trigger$ = trigger$ ? trigger$ : new Subject<void>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trigger'] && this.trigger) {
      this.trigger$.next();
    }
  }

  ngAfterViewInit(): void {
    this.trigger$
      .pipe(
        switchMap(() => {
          this.isVisible = true;

          this.detectChanges();

          return timer(this.time);
        }),
        takeUntil(this.unsubcribe$)
      )
      .subscribe(() => {
        this.isVisible = false;

        this.detectChanges();
      });
  }
}
