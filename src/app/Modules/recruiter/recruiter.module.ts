import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterComponent } from './recruiter.component';
import { ShortListedComponent } from './short-listed/short-listed.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RecruiterComponent,
    ShortListedComponent
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    SharedModule
  ]
})
export class RecruiterModule { }
