import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BUHeadComponent } from './buhead.component';
import { ManpowerPlanningandBudgetingdashComponent } from './manpower-planningand-budgetingdash/manpower-planningand-budgetingdash.component';

const routes: Routes = [{ path: '', component: BUHeadComponent },
{path:'ManpowerPlanningandBudgetingdash',component:ManpowerPlanningandBudgetingdashComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BUHeadRoutingModule { }
