import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisMissionComponent } from './frais-mission.component';

describe('FraisMissionComponent', () => {
  let component: FraisMissionComponent;
  let fixture: ComponentFixture<FraisMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FraisMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraisMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
