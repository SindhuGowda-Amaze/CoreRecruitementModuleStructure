import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-vendor-staff-form',
  templateUrl: './vendor-staff-form.component.html',
  styleUrls: ['./vendor-staff-form.component.css']
})
export class VendorStaffFormComponent implements OnInit {

  signature: any;
  staff_Name: any;
  phone_Number: any;
  Email_ID: any;
  staff_Code: any;
  role_Id: any;
  vendor_Name: any;
  err: any;


  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
  result: any;
  Actions: any;
  id: any;
  currentUrl:any
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.role_Id="";
    this.vendor_Name="";
    this.GetRoleType();
    this.GetVendor_Dasboard();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetVendor_Staff();

      }
    })

  }
  Company_logo: any;
  files: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.uploadattachments();
    console.log("content", this.files);
  }
  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  public uploadattachments() {
    debugger
    this.RecruitmentServiceService.UploadImages(this.files)
    .subscribe(res => {
      debugger
      this.Company_logo = res;
      alert("ATTACHMENT UPLOADED");
    })
  }

  GetVendor_Staff() {
    this.RecruitmentServiceService.GetVendor_Staff().subscribe({
        next: data => {
          debugger
          this.result = data;
          this.result = this.result.filter((x: { id: any; }) => x.id == Number(this.id));
          this.vendor_Name = this.result[0].vendor_Name;
          this.staff_Name = this.result[0].staff_Name;
          this.Email_ID = this.result[0].email_Id;
          this.phone_Number = this.result[0].phone_Number;
          // this.Company_logo = this.result[0].signature;
          // this.role_Id = this.result[0].role;
          Swal.fire('Issue in Getting Expenses List Web');
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
  Save() {
    debugger;
    var json = {
      "VendorId": this.vendor_Name,
      "Staff_Name": this.staff_Name,
      "Phone_Number": this.phone_Number,
      "Email_Id": this.Email_ID,
      "Signature": this.Company_logo,
      "Role": this.role_Id
    };
    this.RecruitmentServiceService.InsertVendor_Staff(json).subscribe({
        next: data => {
          debugger
          let id = data;
          alert("Successfully saved!!")
          location.href = "#/VendorStaffDashboard"
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
  vendordetails: any;
  public GetVendor_Dasboard() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: data => {
        debugger
        this.vendordetails = data;
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
  roleList:any;
  public GetRoleType() {
    debugger
    this.RecruitmentServiceService.GetRoleType().subscribe({
      next: data => {
        debugger
        this.roleList = data
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

  Update() {
    debugger
    var json = {
      "ID": this.id,
      "VendorID": this.vendor_Name,
      "Staff_Name": this.staff_Name,
      "Phone_Number": this.phone_Number,
      "Email_ID": this.Email_ID,

      "Signature": this.Company_logo,
      "Role": this.role_Id
    };
    this.RecruitmentServiceService.UpdateVendor_Staff(json).subscribe({
      next: data => {
        debugger
        alert("Updated Sucessfully");
        let id = data;
        location.href = "#/VendorStaffDashboard";
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
  cancel(){
    location.href = "#/VendorStaffDashboard";
  }
}






