import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRecruitementReportComponent } from './job-recruitement-report.component';

describe('JobRecruitementReportComponent', () => {
  let component: JobRecruitementReportComponent;
  let fixture: ComponentFixture<JobRecruitementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobRecruitementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRecruitementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
