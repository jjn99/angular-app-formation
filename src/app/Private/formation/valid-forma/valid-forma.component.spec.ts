import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidFormaComponent } from './valid-forma.component';

describe('ValidFormaComponent', () => {
  let component: ValidFormaComponent;
  let fixture: ComponentFixture<ValidFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidFormaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
