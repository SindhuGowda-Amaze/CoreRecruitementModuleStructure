//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Get SupportTickets Data, Get images,Delete SupportTickets Data.
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022



import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-support-ticket-dashboard',
  templateUrl: './support-ticket-dashboard.component.html',
  styleUrls: ['./support-ticket-dashboard.component.css']
})
export class SupportTicketDashboardComponent implements OnInit {
  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
   
  //Variable Declerations//

  ticketlist: any;
  search: any;
  count: any;
  currentUrl: any;
  attachmentlist: any;


  ngOnInit(): void {

   //Variable Initialisation and Default Method Calls//
  
    this.GetSupportTickets();
    this.currentUrl = window.location.href;
  }

  //Method to Get SupportTickets Data//

  public GetSupportTickets() {
    debugger
    this.RecruitmentServiceService.GetSupportTickets().subscribe(
      data => {
        this.ticketlist = data.filter(x => x.applicationName == 'Recruitment System');
        this.count = this.ticketlist.length;
      }
    )
  }
 
 
  //Method to Get images//
  image(id: any) {
    debugger
    this.RecruitmentServiceService.GetSupportAttachment().subscribe(
      data => {
        debugger
        this.attachmentlist = data.filter(x => x.ticketID == id);
      }
    )
  }
  
//Method to Delete SupportTickets Data//

  public DeleteSupportTickets(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.RecruitmentServiceService.DeleteSupportTickets(ID).subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully')
            location.reload();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in  Deleting Support Tickets');
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
      }
    })
  }

}
