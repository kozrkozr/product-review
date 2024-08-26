import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  Inject,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TIME_LIMITED_TEMPLATE_TRIGGER } from './time-limited-content-trigger.token';
import { Subject, switchMap, takeUntil, timer } from 'rxjs';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { DetachedChangeDetection } from '../helpers/detached-change-detection.class';

const DEFAULT_DISPLAYED_TIME = 3000;

@Directive({
  selector: '[appTimeLimitedTemplate]',
  providers: [UnsubscribeService],
})
export class TimeLimitedTemplateDirective
  extends DetachedChangeDetection
  implements OnChanges, AfterViewInit
{
  @Input() time: number = DEFAULT_DISPLAYED_TIME;
  @Input() trigger: boolean = false;

  trigger$: Subject<void>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    @Optional()
    @Inject(TIME_LIMITED_TEMPLATE_TRIGGER)
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
          if (this.viewContainer.length === 0) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          }

          this.detectChanges();

          return timer(this.time);
        }),
        takeUntil(this.unsubcribe$)
      )
      .subscribe(() => {
        this.viewContainer.clear();

        this.detectChanges();
      });
  }
}
