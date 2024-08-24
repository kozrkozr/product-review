import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export const TIME_LIMITED_CONTENTS_TRIGGER = new InjectionToken<Subject<void>>(
  'TIME_LIMITED_CONTENTS_TRIGGER'
);
