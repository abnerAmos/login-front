import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstInputComponent } from './login-input.component';

describe('FirstInputComponent', () => {
  let component: FirstInputComponent;
  let fixture: ComponentFixture<FirstInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FirstInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
