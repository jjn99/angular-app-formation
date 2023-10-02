import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrganismeComponent } from './form-organisme.component';

describe('FormOrganismeComponent', () => {
  let component: FormOrganismeComponent;
  let fixture: ComponentFixture<FormOrganismeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOrganismeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormOrganismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
