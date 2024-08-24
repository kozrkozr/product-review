import { ReplaySubject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class UnsubscribeService
  extends ReplaySubject<void>
  implements OnDestroy
{
  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
