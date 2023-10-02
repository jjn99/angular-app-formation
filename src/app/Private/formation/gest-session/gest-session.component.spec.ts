import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestSessionComponent } from './gest-session.component';

describe('GestSessionComponent', () => {
  let component: GestSessionComponent;
  let fixture: ComponentFixture<GestSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
