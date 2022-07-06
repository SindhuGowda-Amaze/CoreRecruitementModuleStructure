import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { ClientStaffDashboardComponent } from './client-staff-dashboard/client-staff-dashboard.component';
import { ClientStaffFormComponent } from './client-staff-form/client-staff-form.component';
import { ClientdashboardComponent } from './clientdashboard/clientdashboard.component';
import { ClientformComponent } from './clientform/clientform.component';
import { JobApprovalConfigComponent } from './job-approval-config/job-approval-config.component';
import { JobDescriptionDashComponent } from './job-description-dash/job-description-dash.component';
import { JobDescriptionFormComponent } from './job-description-form/job-description-form.component';
import { RecruiterDashboardComponent } from './recruiter-dashboard/recruiter-dashboard.component';
import { RecruiterFormComponent } from './recruiter-form/recruiter-form.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { VendorStaffDashboardComponent } from './vendor-staff-dashboard/vendor-staff-dashboard.component';
import { VendorStaffFormComponent } from './vendor-staff-form/vendor-staff-form.component';

const routes: Routes = [{ path: '', component: AdminComponent },
{path:'AdminDashboard',component:AdminDashboardComponent},

{path:'ClientStaffDashboard',component:ClientStaffDashboardComponent},
{path:'ClientStaffForm/:id',component:ClientStaffFormComponent},


{path:'Clientdashboard',component:ClientdashboardComponent},
{path:'Clientform/:id',component:ClientformComponent},

{path:'JobApprovalConfig',component:JobApprovalConfigComponent},

{path:'JobDescriptionDash',component:JobDescriptionDashComponent},
{path:'JobDescriptionForm/:id',component:JobDescriptionFormComponent},

{path:'RecruiterDashboard',component:RecruiterDashboardComponent},
{path:'RecruiterForm/:id',component:RecruiterFormComponent},


{path:'VendorDashboard',component:VendorDashboardComponent},
{path:'VendorForm/:id',component:VendorFormComponent},

{path:'VendorStaffDashboard',component:VendorStaffDashboardComponent},
{path:'VendorStaffForm',component:VendorStaffFormComponent}







];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
