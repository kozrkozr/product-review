import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageOutletComponent } from './error-message-outlet.component';

describe('HttpErrorMessageOutletComponent', () => {
  let component: ErrorMessageOutletComponent;
  let fixture: ComponentFixture<ErrorMessageOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorMessageOutletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
