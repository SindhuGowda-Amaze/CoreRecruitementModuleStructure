import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BUHeadRoutingModule } from './buhead-routing.module';
import { BUHeadComponent } from './buhead.component';


@NgModule({
  declarations: [
    BUHeadComponent
  ],
  imports: [
    CommonModule,
    BUHeadRoutingModule
  ]
})
export class BUHeadModule { }
