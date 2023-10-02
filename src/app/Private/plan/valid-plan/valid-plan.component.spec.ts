import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidPlanComponent } from './valid-plan.component';

describe('ValidPlanComponent', () => {
  let component: ValidPlanComponent;
  let fixture: ComponentFixture<ValidPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
