import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BUHeadRoutingModule } from './buhead-routing.module';
import { BUHeadComponent } from './buhead.component';
import { ManpowerPlanningandBudgetingdashComponent } from './manpower-planningand-budgetingdash/manpower-planningand-budgetingdash.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    BUHeadComponent,
    ManpowerPlanningandBudgetingdashComponent
  ],
  imports: [
    CommonModule,
    BUHeadRoutingModule,
    SharedModule
  ]
})
export class BUHeadModule { }
