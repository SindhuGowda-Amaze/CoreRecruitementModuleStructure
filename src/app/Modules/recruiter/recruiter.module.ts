import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterComponent } from './recruiter.component';
import { ShortListedComponent } from './short-listed/short-listed.component';
import { SharedModule } from '../shared/shared.module';
import { VendorJobOpeningsComponent } from './vendor-job-openings/vendor-job-openings.component';
import { JobVacanciesComponent } from './job-vacancies/job-vacancies.component';
import { RescheduledInterviewComponent } from './rescheduled-interview/rescheduled-interview.component';


@NgModule({
  declarations: [
    RecruiterComponent,
    ShortListedComponent,
    VendorJobOpeningsComponent,
    JobVacanciesComponent,
    RescheduledInterviewComponent
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    SharedModule
  ]
})
export class RecruiterModule { }
