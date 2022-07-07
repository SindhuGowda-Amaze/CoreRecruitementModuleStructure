import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { JobRecruitementReportComponent } from './job-recruitement-report/job-recruitement-report.component';
import { AppliedCandidatesReportsComponent } from './applied-candidates-reports/applied-candidates-reports.component';
import { ShortlistedCandidatesReportsComponent } from './shortlisted-candidates-reports/shortlisted-candidates-reports.component';
import { SelectedCandidatesReportsComponent } from './selected-candidates-reports/selected-candidates-reports.component';
import { OfferedCandidatesReportsComponent } from './offered-candidates-reports/offered-candidates-reports.component';
import { JoinedCandidatesReportComponent } from './joined-candidates-report/joined-candidates-report.component';
import { DroppedCandiadtesReportsComponent } from './dropped-candiadtes-reports/dropped-candiadtes-reports.component';
const routes: Routes = [
  
  { path: '', component: ReportComponent },
  { path: 'JobRecruitementReport', component: JobRecruitementReportComponent },
  { path: 'AppliedCandidatesReports', component: AppliedCandidatesReportsComponent },
  { path: 'ShortlistedCandidatesReports', component: ShortlistedCandidatesReportsComponent },
  { path: 'SelectedCandidatesReports', component: SelectedCandidatesReportsComponent },
  { path: 'OfferedCandidatesReports', component: OfferedCandidatesReportsComponent },
  { path: 'JoinedCandidatesReport', component: JoinedCandidatesReportComponent },
  { path: 'DroppedCandiadtesReports', component: DroppedCandiadtesReportsComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
