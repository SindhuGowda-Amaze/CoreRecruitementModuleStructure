import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { HrComponent } from './hr.component';
import { OfferedCandidatesComponent } from './offered-candidates/offered-candidates.component';
import { JoinedCandidatesComponent } from './joined-candidates/joined-candidates.component';
import { DroppedCandidatesComponent } from './dropped-candidates/dropped-candidates.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HrComponent,
    OfferedCandidatesComponent,
    JoinedCandidatesComponent,
    DroppedCandidatesComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    SharedModule
  ]
})
export class HrModule { }
