import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'recruiter', loadChildren: () => import('./Modules/recruiter/recruiter.module').then(m => m.RecruiterModule) },
  { path: 'vendor', loadChildren: () => import('./Modules/vendor/vendor.module').then(m => m.VendorModule) },
  { path: 'hirignmanager', loadChildren: () => import('./Modules/Client/hiringmanager/hiringmanager.module').then(m => m.HiringmanagerModule) },
  { path: 'shared', loadChildren: () => import('./Modules/shared/shared.module').then(m => m.SharedModule) },
  { path: 'interviewpanel', loadChildren: () => import('./Modules/Client/interview-panel/interview-panel.module').then(m => m.InterviewPanelModule) },
  { path: 'BUHead', loadChildren: () => import('./Modules/Client/buhead/buhead.module').then(m => m.BUHeadModule) },
  { path: 'manager', loadChildren: () => import('./Modules/Client/manager/manager.module').then(m => m.ManagerModule) },
  { path: 'report', loadChildren: () => import('./Modules/report/report.module').then(m => m.ReportModule) },
  { path: 'hr', loadChildren: () => import('./Modules/Client/hr/hr.module').then(m => m.HrModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
