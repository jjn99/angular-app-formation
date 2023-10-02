import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSousEntiteComponent } from './budget-sous-entite.component';

describe('BudgetSousEntiteComponent', () => {
  let component: BudgetSousEntiteComponent;
  let fixture: ComponentFixture<BudgetSousEntiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetSousEntiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetSousEntiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
