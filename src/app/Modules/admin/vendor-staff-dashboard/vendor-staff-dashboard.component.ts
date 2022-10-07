//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains  To get Count Vendor_Staff,Delete the Data in Vendor_Staff Details,EnableVendorStaff
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-staff-dashboard',
  templateUrl: './vendor-staff-dashboard.component.html',
  styleUrls: ['./vendor-staff-dashboard.component.css']
})
export class VendorStaffDashboardComponent implements OnInit {

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
  
  //Variable Declerations//

  vendor_Name: any;
  staff_Name: any;
  email_Id: any;
  phone_Number: any;
  staff_Code: any;
  signature: any;
  role_Id: any;
  staffdetails: any;
  count: any;
  loader: any;
  search: any;
  Job:any;
  currentUrl: any
 
  ngOnInit(): void {
       //Variable Initialisation and Default Method Calls//
     this.GetVendor_Staff();
    this.currentUrl = window.location.href;
    this.loader = true;
  }


   // Methods to get Count of vendor Satff Details//

  public GetVendor_Staff() {
    this.RecruitmentServiceService.GetVendor_Staff().subscribe({
      next: data => {
        debugger
        this.staffdetails = data;
        this.loader = false;
        this.count = this.staffdetails.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Vendor Staff');
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
// Method to get Routing with Respect of URL//
  edit(id: any) {
    debugger
    location.href = "#/admin/VendorStaffForm/" + id;
  }

  // Method to Delete the data in Vendor_Staff table//

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
        this.RecruitmentServiceService.DeleteVendor_Staff(id).subscribe({
          next: data => {
            debugger
            this.GetVendor_Staff();
            Swal.fire('Deleted Successfully');
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Getting Expenses List Web');
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
 //Method to DisableStaff from VendorStaff//

 public DisableStaff(id: any) {
    debugger
    var eb = {
      'ID': id,
      'Enable_Disable': 1
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Disable the Vendor Staff.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Disable it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.RecruitmentServiceService.EnableVendorStaff(eb).subscribe({
          next: data => {
            debugger
            Swal.fire('Disabled Successfully.');
            location.reload();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Disabling Vendor Staff');
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


 //Method to EnableStaff from VendorStaff//
  public DisableStaff1(id: any) {
    debugger
    var eb = {
      'ID': id,
      'Enable_Disable': 0
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Enable it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Enabled it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.RecruitmentServiceService.EnableVendorStaff(eb).subscribe({
          next: data => {
            debugger
            Swal.fire('Enabled successfully.');
            location.reload();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in ');
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
