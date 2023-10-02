import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidServiceComponent } from './valid-service.component';

describe('ValidServiceComponent', () => {
  let component: ValidServiceComponent;
  let fixture: ComponentFixture<ValidServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
