import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewPanelRoutingModule } from './interview-panel-routing.module';
import { InterviewPanelComponent } from './interview-panel.component';
import { ScheduledInterviewsComponent } from './scheduled-interviews/scheduled-interviews.component';
import { RejectedComponent } from './rejected/rejected.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    InterviewPanelComponent,
    ScheduledInterviewsComponent,
    RejectedComponent
  ],
  imports: [
    CommonModule,
    InterviewPanelRoutingModule,
    SharedModule
  ]
})
export class InterviewPanelModule { }
