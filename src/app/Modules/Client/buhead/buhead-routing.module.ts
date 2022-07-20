import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BUHeadComponent } from './buhead.component';
import { ManpowerPlanningandBudgetingComponent } from './manpower-planningand-budgeting/manpower-planningand-budgeting.component';
import { ManpowerPlanningandBudgetingdashComponent } from './manpower-planningand-budgetingdash/manpower-planningand-budgetingdash.component';

const routes: Routes = [{ path: '', component: BUHeadComponent },
{path:'ManpowerPlanningandBudgetingdash',component:ManpowerPlanningandBudgetingdashComponent},
{path:'ManpowerPlanningandBudgeting',component:ManpowerPlanningandBudgetingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BUHeadRoutingModule { }
