import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidPlanningComponent } from './valid-planning.component';

describe('ValidPlanningComponent', () => {
  let component: ValidPlanningComponent;
  let fixture: ComponentFixture<ValidPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
