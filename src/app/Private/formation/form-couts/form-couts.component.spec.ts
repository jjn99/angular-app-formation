import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoutsComponent } from './form-couts.component';

describe('FormCoutsComponent', () => {
  let component: FormCoutsComponent;
  let fixture: ComponentFixture<FormCoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCoutsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
