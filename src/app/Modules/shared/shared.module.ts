import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HelpComponent } from './help/help.component';
import { SupportTicketDashboardComponent } from './support-ticket-dashboard/support-ticket-dashboard.component';
import { SupportTicketsComponent } from './support-tickets/support-tickets.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    SharedComponent,
    HelpComponent,
    SupportTicketDashboardComponent,
    SupportTicketsComponent,
  
  
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,

  ],
  exports: [
    Ng2SearchPipeModule,
    FormsModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
   
  ]



})
export class SharedModule { }
