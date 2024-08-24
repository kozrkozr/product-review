import { ChangeDetectorRef } from '@angular/core';

export abstract class DetachedChangeDetection {
  private isDetached = false;

  constructor(protected cdr: ChangeDetectorRef) {
    this.detachChangeDetection();
  }

  protected detachChangeDetection(): void {
    if (!this.isDetached) {
      this.cdr.detach();
      this.isDetached = true;
    }
  }

  protected reattachChangeDetection(): void {
    if (this.isDetached) {
      this.cdr.reattach();
      this.isDetached = false;
    }
  }

  protected detectChanges(): void {
    this.cdr.detectChanges();
  }

  protected markForCheck(): void {
    this.cdr.markForCheck();
  }
}
