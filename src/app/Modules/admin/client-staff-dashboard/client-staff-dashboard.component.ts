// Product : DigiCoreRecrcitment System 1.0 
// Date : 28 Jan, 2022
// Author :Prasanth,Praveen,Sindhu,Anusha,Madhava
// Description :This page contains methods GetClientStaff,DeleteClientStaff,EnableClientStaff
// Last Modified Date : 25 July , 2022
// Last Modified Changes :   Added comments
// Last Modified By : Manikanta
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

//Variable Declerations//

  Job:any;
  count: any;
  search:any;
  loader:any;
  currentUrl: any;
  ClientStaffList:any
  
  constructor( private RecruitmentServiceService: RecruitementService, private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

 //Variable Initialisation and Default Method Calls// 

   this.GetClientStaff();
   this.currentUrl = window.location.href;
   this.loader=true;
  }

  // Methods to get Count of Staff from GetClientStaff,DeleteClientStaff,EnableClientStaff//

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

  edit(details: any){
    debugger
    location.href="#/admin/ClientStaffForm/"+ details;
    }


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
