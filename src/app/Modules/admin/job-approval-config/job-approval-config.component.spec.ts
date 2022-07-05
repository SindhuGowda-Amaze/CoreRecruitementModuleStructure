import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApprovalConfigComponent } from './job-approval-config.component';

describe('JobApprovalConfigComponent', () => {
  let component: JobApprovalConfigComponent;
  let fixture: ComponentFixture<JobApprovalConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApprovalConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApprovalConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
