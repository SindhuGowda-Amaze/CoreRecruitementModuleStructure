import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRequisitionComponent } from './job-requisition.component';

describe('JobRequisitionComponent', () => {
  let component: JobRequisitionComponent;
  let fixture: ComponentFixture<JobRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobRequisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
