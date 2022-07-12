import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobVacanciesComponent } from './job-vacancies/job-vacancies.component';
import { RecruiterComponent } from './recruiter.component';
import { ShortListedComponent } from './short-listed/short-listed.component';
import { VendorJobOpeningsComponent } from './vendor-job-openings/vendor-job-openings.component';

const routes: Routes = [
  { path: '', component: RecruiterComponent },
  {path:'ShortListed',component:ShortListedComponent},
  {path:'JobVacancies',component:JobVacanciesComponent},
  {path:'VendorJobOpenings',component:VendorJobOpeningsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
