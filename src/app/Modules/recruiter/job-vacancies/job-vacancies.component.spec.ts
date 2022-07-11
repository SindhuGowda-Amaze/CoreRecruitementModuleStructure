import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobVacanciesComponent } from './job-vacancies.component';

describe('JobVacanciesComponent', () => {
  let component: JobVacanciesComponent;
  let fixture: ComponentFixture<JobVacanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobVacanciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
