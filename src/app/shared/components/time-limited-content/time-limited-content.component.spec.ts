import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLimitedContentComponent } from './time-limited-content.component';

describe('TimeLimitedContentComponent', () => {
  let component: TimeLimitedContentComponent;
  let fixture: ComponentFixture<TimeLimitedContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeLimitedContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeLimitedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
