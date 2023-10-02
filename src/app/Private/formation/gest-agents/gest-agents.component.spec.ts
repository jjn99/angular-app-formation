import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestAgentsComponent } from './gest-agents.component';

describe('GestAgentsComponent', () => {
  let component: GestAgentsComponent;
  let fixture: ComponentFixture<GestAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestAgentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
