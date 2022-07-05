import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BUHeadComponent } from './buhead.component';

const routes: Routes = [{ path: '', component: BUHeadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BUHeadRoutingModule { }
