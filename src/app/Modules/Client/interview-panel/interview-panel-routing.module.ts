import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewPanelComponent } from './interview-panel.component';
import { RejectedComponent } from './rejected/rejected.component';
import { ScheduledInterviewsComponent } from './scheduled-interviews/scheduled-interviews.component';

const routes: Routes = [
  
  { path: '', component: InterviewPanelComponent },
{path:'ScheduledInterviews',component:ScheduledInterviewsComponent},
{path:'Rejected',component:RejectedComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewPanelRoutingModule { }
