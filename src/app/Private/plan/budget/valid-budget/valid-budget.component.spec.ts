import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidBudgetComponent } from './valid-budget.component';

describe('ValidBudgetComponent', () => {
  let component: ValidBudgetComponent;
  let fixture: ComponentFixture<ValidBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
