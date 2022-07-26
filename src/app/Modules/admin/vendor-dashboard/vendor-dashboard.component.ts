//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains  methods from  GetVendor_Dasboard,DeleteVendor_Dasboard
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {
 
  //Variable Declerations//

  err: any;
  vendordetails: any;
  vendor_Logo: any;
  vendor_Name: any;
  phone_Number: any;
  email_Id: any;
  address: any;
  search: any;
  count: any;
  loader: any;
  Job: any;
  currentUrl: any

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    
    //Variable Initialisation and Default Method Calls//
    this.GetVendor_Dasboard();
    this.currentUrl = window.location.href;
    this.loader = true;
  }

   // Methods to get Count of GetVendor_Dasboard,DeleteVendor_Dasboard

  public GetVendor_Dasboard() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: data => {
        debugger
        this.vendordetails = data;
        this.loader = false;
        this.count = this.vendordetails.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Getting vendor Dashboard');
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

  edit(id: any) {
    debugger
    location.href = "#/admin/VendorForm/" + id;
  }

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
        this.RecruitmentServiceService.DeleteVendor_Dasboard(id).subscribe({
          next: data => {
            debugger
            this.GetVendor_Dasboard();
            swal.fire('Deleted Sucessfully');

            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': this.err.error.message
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
