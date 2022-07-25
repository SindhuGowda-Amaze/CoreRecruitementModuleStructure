// Product : DigiCoreRecrcitment System 1.0 
// Date : 28 Jan, 2022
// Author :Prasanth,Praveen,Sindhu,Anusha,Madhava
// Description :this procedure Gets the active records of CandidateRegistration Table
// Last Modified Date : 25 July , 2022
// Last Modified Changes :   Added comments
// Last Modified By : Madhava
// Copyrights : AmazeINC-Bangalore-2022 


import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-staff-dashboard',
  templateUrl: './client-staff-dashboard.component.html',
  styleUrls: ['./client-staff-dashboard.component.css']
})
export class ClientStaffDashboardComponent implements OnInit {
   // variable declaration
  Job:any;
  count: any;
  search:any;
  loader:any;
  currentUrl: any;
  ClientStaffList:any
  
  constructor( private RecruitmentServiceService: RecruitementService, private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
        // variable initialisation
    this.currentUrl = window.location.href;
   this.GetClientStaff();
   this.loader=true;
  }

// Default Method calls
// Method to display data  from ClientStaff Table
  public GetClientStaff() {
    debugger
    this.RecruitmentServiceService.GetClientStaff().subscribe({
      next: data => {
        debugger
        this.ClientStaffList=data ;
      this.loader=false;
      this.count = this.ClientStaffList.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting ClientStaff');
        // Insert error in Db Here//
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
// Method to update the  data  from ClientStaff Table
  edit(details: any){
    debugger
    location.href="#/admin/ClientStaffForm/"+ details;
    }

// Method to delete  the  data  from ClientStaff Table
  public delete(details: any) {
    debugger
    var json={
      "ID":details.id
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.RecruitmentServiceService.DeleteClientStaff(details.id).subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully')
            location.reload();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Deleting ClientStaff');
            // Insert error in Db Here//
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
//Method to EnableStaff from ClientStaff
  public DisableStaff(id: any) {
    debugger
    var eb = {
      'ID': id,
      'Enable_Disable': 1
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Disable it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Disable it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.RecruitmentServiceService.EnableClientStaff(eb).subscribe({
          next: data => {
            debugger
            Swal.fire('Disable successfully.');
            location.reload();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue Enable ClientStaff');
            // Insert error in Db Here//
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
//Method to DisableStaff from ClientStaff
  public DisableStaff1(id: any) {
    debugger
    var eb = {
      'ID': id,
      'Enable_Disable': 0
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Disable it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Disable it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.RecruitmentServiceService.EnableClientStaff(eb).subscribe({
          next: data => {
            debugger
            Swal.fire('Updated successfully.');
            location.reload();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Updating  Enable ClientStaff');
            // Insert error in Db Here//
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
