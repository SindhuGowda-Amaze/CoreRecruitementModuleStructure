import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiringmanagerComponent } from './hiringmanager.component';

const routes: Routes = [{ path: '', component: HiringmanagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiringmanagerRoutingModule { }
