import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginUpdateComponent } from './user-login-update.component';

describe('UserLoginUpdateComponent', () => {
  let component: UserLoginUpdateComponent;
  let fixture: ComponentFixture<UserLoginUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
