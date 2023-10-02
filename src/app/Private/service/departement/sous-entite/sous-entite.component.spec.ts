import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousEntiteComponent } from './sous-entite.component';

describe('SousEntiteComponent', () => {
  let component: SousEntiteComponent;
  let fixture: ComponentFixture<SousEntiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousEntiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousEntiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
