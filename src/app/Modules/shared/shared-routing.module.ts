import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { SharedComponent } from './shared.component';
import { SupportTicketDashboardComponent } from './support-ticket-dashboard/support-ticket-dashboard.component';
import { SupportTicketsComponent } from './support-tickets/support-tickets.component';

const routes: Routes = [
  
  { path: '', component: SharedComponent },
  { path: 'Help', component: HelpComponent },
  { path: 'SupportTicketDash', component: SupportTicketDashboardComponent },
  { path: 'SupportTickets/:id', component: SupportTicketsComponent }
 



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
