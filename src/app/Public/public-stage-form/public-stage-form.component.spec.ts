import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicStageFormComponent } from './public-stage-form.component';

describe('PublicStageFormComponent', () => {
  let component: PublicStageFormComponent;
  let fixture: ComponentFixture<PublicStageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicStageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicStageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
