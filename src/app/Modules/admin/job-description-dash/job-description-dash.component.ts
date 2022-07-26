//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains  methods from  GetJobDescriptionMaster,DeleteJobDescriptionMaster,EnableVendorStaff
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-job-description-dash',
  templateUrl: './job-description-dash.component.html',
  styleUrls: ['./job-description-dash.component.css']
})
export class JobDescriptionDashComponent implements OnInit {
  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
  
  //Variable Declerations//

  vendor_Name: any;
  staff_Name: any;
  email_Id: any;
  phone_Number: any;
  staff_Code: any;
  signature: any;
  role_Id: any;
  Job: any;
  staffdetails: any;
  count: any;
  loader: any;
  search: any;
  currentUrl: any
  err: any
  
  ngOnInit(): void {
  
    //Variable Initialisation and Default Method Calls//
    this.GetJobDescriptionMaster();

    this.currentUrl = window.location.href;
    
    this.loader = true;
  }

// Methods to get Count of GetJobDescriptionMaster,DeleteJobDescriptionMaster,EnableVendorStaff//


  public GetJobDescriptionMaster() {
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
      next: data => {
        debugger
        this.staffdetails = data;
        this.loader = false;
        this.count = this.staffdetails.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting  Job Description Master ');
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
  // public Ondelete(id: any) {
  //     debugger

  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'You Want to delete it.',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, Delete it!',
  //       cancelButtonText: 'No, keep it'
  //     }).then((result) => {
  //       if (result.value == true) {
  //         this.RecruitmentServiceService.DeleteJobDescriptionMaster(id).subscribe({
  //   next: data => {
  //     debugger
  //     this.GetJobDescriptionMaster();
  //     Swal.fire('Deleted');
  //   }, error: (err: { error: { message: any; }; }) => {
  //     Swal.fire('Issue in Getting Expenses List Web');
  //     // Insert error in Db Here//
  //     var obj = {
  //       'PageName': this.currentUrl,
  //       'ErrorMessage': err.error.message
  //     }
  //     this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
  //       data => {
  //         debugger
  //       },
  //     )
  //   }
  // })
  //       }
  //     })
  //   }

  public Ondelete(id: any) {
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
        this.RecruitmentServiceService.DeleteJobDescriptionMaster(id).subscribe({
          next: data => {
            debugger
            this.GetJobDescriptionMaster();
            Swal.fire('Deleted');
          }
        })
      }
    })
  }

  edit(id: any) {
    debugger
    location.href = "#/admin/JobDescriptionForm/" + id;
  }


  public DisableStaff(id: any) {
    var eb = {
      'ID': id,
      'Enable_Disable': 1
    }

    this.RecruitmentServiceService.EnableVendorStaff(eb).subscribe({
      next: data => {
        debugger
        Swal.fire('Updated successfully.');
        location.reload();
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Enable VendorStaff');
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
  
  public DisableStaff1(id: any) {
    var eb = {
      'ID': id,
      'Enable_Disable': 0
    }
    this.RecruitmentServiceService.EnableVendorStaff(eb).subscribe({
      next: data => {
        debugger
        Swal.fire('Updated successfully.');
        location.reload();
      },error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Enable Vendor Staff');
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
      }
    )
  }
}
