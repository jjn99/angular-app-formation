import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurkinaComponent } from './burkina.component';

describe('BurkinaComponent', () => {
  let component: BurkinaComponent;
  let fixture: ComponentFixture<BurkinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurkinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurkinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
