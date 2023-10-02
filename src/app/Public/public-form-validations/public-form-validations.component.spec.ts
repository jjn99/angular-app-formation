import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFormValidationsComponent } from './public-form-validations.component';

describe('PublicFormValidationsComponent', () => {
  let component: PublicFormValidationsComponent;
  let fixture: ComponentFixture<PublicFormValidationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicFormValidationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicFormValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
