import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheFormationComponent } from './fiche-formation.component';

describe('FicheFormationComponent', () => {
  let component: FicheFormationComponent;
  let fixture: ComponentFixture<FicheFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
