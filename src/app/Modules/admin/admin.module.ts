import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ClientdashboardComponent } from './clientdashboard/clientdashboard.component';
import { ClientformComponent } from './clientform/clientform.component';
import { RecruiterDashboardComponent } from './recruiter-dashboard/recruiter-dashboard.component';
import { RecruiterFormComponent } from './recruiter-form/recruiter-form.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { VendorStaffDashboardComponent } from './vendor-staff-dashboard/vendor-staff-dashboard.component';
import { VendorStaffFormComponent } from './vendor-staff-form/vendor-staff-form.component';
import { JobDescriptionDashComponent } from './job-description-dash/job-description-dash.component';
import { JobDescriptionFormComponent } from './job-description-form/job-description-form.component';
import { JobApprovalConfigComponent } from './job-approval-config/job-approval-config.component';
import { ClientStaffDashboardComponent } from './client-staff-dashboard/client-staff-dashboard.component';
import { ClientStaffFormComponent } from './client-staff-form/client-staff-form.component';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AdminComponent,
    ClientdashboardComponent,
    ClientformComponent,
    RecruiterDashboardComponent,
    RecruiterFormComponent,
    VendorDashboardComponent,
    VendorFormComponent,
    VendorStaffDashboardComponent,
    VendorStaffFormComponent,
    JobDescriptionDashComponent,
    JobDescriptionFormComponent,
    JobApprovalConfigComponent,
    ClientStaffDashboardComponent,
    ClientStaffFormComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
