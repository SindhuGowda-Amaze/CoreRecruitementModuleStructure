import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateDocComponent } from './candidate-doc/candidate-doc.component';
import { JobVacanciesComponent } from './job-vacancies/job-vacancies.component';
import { RecruiterComponent } from './recruiter.component';
import { RescheduledInterviewComponent } from './rescheduled-interview/rescheduled-interview.component';
import { ShortListedComponent } from './short-listed/short-listed.component';
import { VendorJobOpeningsComponent } from './vendor-job-openings/vendor-job-openings.component';

const routes: Routes = [
  { path: '', component: RecruiterComponent },
  {path:'ShortListed',component:ShortListedComponent},
  {path:'JobVacancies',component:JobVacanciesComponent},
  {path:'VendorJobOpenings',component:VendorJobOpeningsComponent},
  {path:'JobVacancies/:id',component:JobVacanciesComponent},
  {path:'RescheduledInterview',component:RescheduledInterviewComponent},
  {path:'CandidateDoc/:id',component:CandidateDocComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
