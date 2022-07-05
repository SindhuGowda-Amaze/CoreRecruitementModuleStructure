import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiringmanagerRoutingModule } from './hiringmanager-routing.module';
import { HiringmanagerComponent } from './hiringmanager.component';


@NgModule({
  declarations: [
    HiringmanagerComponent
  ],
  imports: [
    CommonModule,
    HiringmanagerRoutingModule
  ]
})
export class HiringmanagerModule { }
