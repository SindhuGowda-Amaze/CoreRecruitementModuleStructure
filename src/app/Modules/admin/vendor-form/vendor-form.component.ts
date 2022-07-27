//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Attch & Remove files,Upload the Imges, Insert & Update the values in Vendor_Dashboard,Search the Vendor Details,Routing the URL
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent implements OnInit {

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  //Variable Declerations//
  vendorLogo:any;
  vendor_Logo: any;
  vendor_Name: any;
  phone_Number: any;
  email_ID: any;
  address: any;
  result: any;
  id: any;
  currentUrl:any;
  show:any;
  Company_logo: any;
  files: File[] = [];
  ngOnInit(): void {

     //Variable Initialisation and Default Method Calls//

    this.currentUrl = window.location.href;
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.show=1;
        this.GetVendor_Dasboard();
      }
    })

  }

   // Method to Get Attchments of Files//
 
  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.uploadattachments();
    console.log("content", this.files);
  }

  // Method  to Get Remove the files// 
  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  // Method To Get Upload the Imges// 
  public uploadattachments() {
    debugger
    this.RecruitmentServiceService.UploadImages(this.files)
    .subscribe(res => {
      debugger
      this.Company_logo = res;
      Swal.fire("Attachment Uploaded");
    })
  }

  //Method to Insert the values in Vendor_Dasboard in Table//
  Save() {
    debugger
    if(this.vendor_Name==undefined||this.phone_Number==undefined||this.email_ID==undefined||this.address==undefined||this.Company_logo==undefined || this.vendor_Name==""||this.phone_Number==""||this.email_ID==""||this.address==""||this.Company_logo=="")
    {
      Swal.fire("Please Fill All Fields to Save!!!");
    }
else{
  var json = {
    "Vendor_Logo": this.Company_logo,
    "Vendor_Name": this.vendor_Name,
    "Phone_Number": this.phone_Number,
    "Email_ID": this.email_ID,
    "Address": this.address
  };
  this.RecruitmentServiceService.InsertVendor_Dasboard(json).subscribe({
      next: data => {
        debugger
        let id = data;
      Swal.fire("Saved Successfully");
      location.href = "#/admin/VendorDashboard";
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Inserting Vendor Dasboard');
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
  }
 
  // Method to Search the Vendor Details// 

public GetVendor_Dasboard() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: data => {
        debugger
        this.result = data;
        this.result = this.result.filter((x: { id: any; }) => x.id == Number(this.id));
        this.vendor_Logo = this.result[0].vendor_Logo;
        this.vendor_Name = this.result[0].vendor_Name;
        this.phone_Number = this.result[0].phone_Number;
        this.email_ID = this.result[0].email_ID;
        this.address = this.result[0].address;
        this.vendorLogo=this.result[0].vendor_Logo
        this.Company_logo=this.result[0].logourl
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

  // Method to update the values in Vendor_Dashboard table//

  Update() {
    debugger
    var json = {
      "ID": this.id,
      "Vendor_Logo": this.Company_logo,
      "Vendor_Name": this.vendor_Name,
      "Phone_Number": this.phone_Number,
      "Email_ID": this.email_ID,
      "Address": this.address
    };

    this.RecruitmentServiceService.UpdateVendor_Dasboard(json).subscribe({
        next: data => {
          debugger
          let result = data;
        Swal.fire("Updated Successfully");
        location.href = "#/admin/VendorDashboard";
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in  Update Vendor Dasboard');
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
// Method to Routing With Respect to URL
  cancel() {
    location.href ='#/admin/VendorDashboard';
  }
}
