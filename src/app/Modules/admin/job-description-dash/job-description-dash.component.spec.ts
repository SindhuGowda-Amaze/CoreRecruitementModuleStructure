import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionDashComponent } from './job-description-dash.component';

describe('JobDescriptionDashComponent', () => {
  let component: JobDescriptionDashComponent;
  let fixture: ComponentFixture<JobDescriptionDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDescriptionDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
