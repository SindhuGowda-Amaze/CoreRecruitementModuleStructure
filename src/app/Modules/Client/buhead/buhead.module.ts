import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BUHeadRoutingModule } from './buhead-routing.module';
import { BUHeadComponent } from './buhead.component';
import { ManpowerPlanningandBudgetingdashComponent } from './manpower-planningand-budgetingdash/manpower-planningand-budgetingdash.component';
import { SharedModule } from '../../shared/shared.module';
import { ManpowerPlanningandBudgetingComponent } from './manpower-planningand-budgeting/manpower-planningand-budgeting.component';
import { OfferManagementComponent } from './offer-management/offer-management.component';


@NgModule({
  declarations: [
    BUHeadComponent,
    ManpowerPlanningandBudgetingdashComponent,
    ManpowerPlanningandBudgetingComponent,
    OfferManagementComponent
  ],
  imports: [
    CommonModule,
    BUHeadRoutingModule,
    SharedModule
  ]
})
export class BUHeadModule { }
