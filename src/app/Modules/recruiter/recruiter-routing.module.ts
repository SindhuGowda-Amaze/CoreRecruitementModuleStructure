import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruiterComponent } from './recruiter.component';
import { ShortListedComponent } from './short-listed/short-listed.component';

const routes: Routes = [{ path: '', component: RecruiterComponent },
{path:'ShortListed',component:ShortListedComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
