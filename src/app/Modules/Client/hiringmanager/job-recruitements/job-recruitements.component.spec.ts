import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRecruitementsComponent } from './job-recruitements.component';

describe('JobRecruitementsComponent', () => {
  let component: JobRecruitementsComponent;
  let fixture: ComponentFixture<JobRecruitementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobRecruitementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRecruitementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
