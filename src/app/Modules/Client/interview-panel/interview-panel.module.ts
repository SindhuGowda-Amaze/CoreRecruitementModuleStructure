import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewPanelRoutingModule } from './interview-panel-routing.module';
import { InterviewPanelComponent } from './interview-panel.component';


@NgModule({
  declarations: [
    InterviewPanelComponent
  ],
  imports: [
    CommonModule,
    InterviewPanelRoutingModule
  ]
})
export class InterviewPanelModule { }
