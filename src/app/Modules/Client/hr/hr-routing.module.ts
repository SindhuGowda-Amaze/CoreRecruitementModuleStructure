import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DroppedCandidatesComponent } from './dropped-candidates/dropped-candidates.component';
import { HrComponent } from './hr.component';
import { JoinedCandidatesComponent } from './joined-candidates/joined-candidates.component';
import { OfferedCandidatesComponent } from './offered-candidates/offered-candidates.component';

const routes: Routes = [{ path: '', component: HrComponent },
{path:'DroppedCandidates',component:DroppedCandidatesComponent},
{path:'JoinedCandidates',component:JoinedCandidatesComponent},
{path:'OfferedCandidates',component:OfferedCandidatesComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
