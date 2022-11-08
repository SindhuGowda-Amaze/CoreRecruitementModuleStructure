import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDescriptionDashComponent } from '../../admin/job-description-dash/job-description-dash.component';
import { AppliedCandidatesComponent } from './applied-candidates/applied-candidates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HiringmanagerComponent } from './hiringmanager.component';
import { JobRecruitementsComponent } from './job-recruitements/job-recruitements.component';
import { JobRequisitionComponent } from './job-requisition/job-requisition.component';
import { SelectedCandidatesComponent } from './selected-candidates/selected-candidates.component';
import { CompensationRejectedCandidateComponent } from './compensation-rejected-candidate/compensation-rejected-candidate.component';
import { ExternalJobApplyComponent } from './external-job-apply/external-job-apply.component';

const routes: Routes = [{ path: '', component: HiringmanagerComponent },
{path:'AppliedCandidates',component:AppliedCandidatesComponent},

{path:'Dashboard',component:DashboardComponent},

{path:'JobRecruitements',component:JobRecruitementsComponent},
{path:'JobRequisition',component:JobRequisitionComponent},
{path:'JobRequisition/:id',component:JobRequisitionComponent},


{path:'SelectedCandidates',component:SelectedCandidatesComponent},

{path:'ExternalJobApply/:id',component:ExternalJobApplyComponent},
{path:'ExternalJobApply',component:ExternalJobApplyComponent},
{path:'CompensationRejectedCandidate',component:CompensationRejectedCandidateComponent}








];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiringmanagerRoutingModule { }
