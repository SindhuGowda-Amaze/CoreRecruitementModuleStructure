import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiringmanagerRoutingModule } from './hiringmanager-routing.module';
import { HiringmanagerComponent } from './hiringmanager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobRecruitementsComponent } from './job-recruitements/job-recruitements.component';
import { JobRequisitionComponent } from './job-requisition/job-requisition.component';
import { AppliedCandidatesComponent } from './applied-candidates/applied-candidates.component';
import { SelectedCandidatesComponent } from './selected-candidates/selected-candidates.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HiringmanagerComponent,
    DashboardComponent,
    JobRecruitementsComponent,
    JobRequisitionComponent,
    AppliedCandidatesComponent,
    SelectedCandidatesComponent
  ],
  imports: [
    CommonModule,
    HiringmanagerRoutingModule,
    SharedModule
  ]
})
export class HiringmanagerModule { }
