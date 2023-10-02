import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetEntiteComponent } from './budget-entite.component';

describe('BudgetEntiteComponent', () => {
  let component: BudgetEntiteComponent;
  let fixture: ComponentFixture<BudgetEntiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetEntiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetEntiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
