import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { JobRecruitementReportComponent } from './job-recruitement-report/job-recruitement-report.component';
import { AppliedCandidatesReportsComponent } from './applied-candidates-reports/applied-candidates-reports.component';
import { ShortlistedCandidatesReportsComponent } from './shortlisted-candidates-reports/shortlisted-candidates-reports.component';
import { SelectedCandidatesReportsComponent } from './selected-candidates-reports/selected-candidates-reports.component';
import { OfferedCandidatesReportsComponent } from './offered-candidates-reports/offered-candidates-reports.component';
import { JoinedCandidatesReportComponent } from './joined-candidates-report/joined-candidates-report.component';
import { DroppedCandiadtesReportsComponent } from './dropped-candiadtes-reports/dropped-candiadtes-reports.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ReportComponent,
    JobRecruitementReportComponent,
    AppliedCandidatesReportsComponent,
    ShortlistedCandidatesReportsComponent,
    SelectedCandidatesReportsComponent,
    OfferedCandidatesReportsComponent,
    JoinedCandidatesReportComponent,
    DroppedCandiadtesReportsComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,

]

 
})
export class ReportModule { }
