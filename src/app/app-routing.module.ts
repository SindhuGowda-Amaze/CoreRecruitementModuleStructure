import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'recruiter', loadChildren: () => import('./Modules/recruiter/recruiter.module').then(m => m.RecruiterModule) },
  { path: 'vendor', loadChildren: () => import('./Modules/vendor/vendor.module').then(m => m.VendorModule) },
  { path: 'hiringmanager', loadChildren: () => import('./Modules/Client/hiringmanager/hiringmanager.module').then(m => m.HiringmanagerModule) },
  { path: 'shared', loadChildren: () => import('./Modules/shared/shared.module').then(m => m.SharedModule) },
  { path: 'InterviewPanel', loadChildren: () => import('./Modules/Client/interview-panel/interview-panel.module').then(m => m.InterviewPanelModule) },
  { path: 'BUHead', loadChildren: () => import('./Modules/Client/buhead/buhead.module').then(m => m.BUHeadModule) },
  { path: 'manager', loadChildren: () => import('./Modules/Client/manager/manager.module').then(m => m.ManagerModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
