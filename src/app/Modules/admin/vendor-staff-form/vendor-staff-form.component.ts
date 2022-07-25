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
  VendorStaffForm : any
  VendorId: any;
  staffName: any;
  phoneNumber: any;
  EmailID: any;
  Signature: any;
  Role: any;


  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
  result: any;
  Actions: any;
  id: any;
  currentUrl:any
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.Role="";
    this.VendorId="";
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
      alert("Attachment Uploaded");
    })
  }

  GetVendor_Staff() {
    this.RecruitmentServiceService.GetVendor_Staff().subscribe({
        next: data => {
          debugger
          this.result = data;
          this.result = this.result.filter((x: { id: any; }) => x.id == Number(this.id));
          this.VendorId = this.result[0].vendorID;
          this.staffName = this.result[0].staff_Name;
          this.EmailID = this.result[0].email_Id;
          this.phoneNumber = this.result[0].phone_Number;
          // this.Company_logo = this.result[0].signature;
           this.Role= this.result[0].role;
       
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
    if( this.VendorId==undefined||this.VendorId==null|| 
      this.staffName==undefined||this.staffName==null||
      this.phoneNumber==undefined||this.phoneNumber==null||
      this.EmailID==undefined||this.EmailID==null||
      this.Role==undefined||this.Role==null)
      {
      Swal.fire("Please fill all fields!!");
    }
    else{
      var json = {
      "VendorId": this.VendorId,
      "Staff_Name": this.staffName,
      "Phone_Number": this.phoneNumber,
      "Email_Id": this.EmailID,
      "Signature": this.Company_logo,
      "Role": this.Role
    };
    this.RecruitmentServiceService.InsertVendor_Staff(json).subscribe({
      next: data => {
        debugger
        let id = data;
        Swal.fire('Saved Successfully..!');
        location.href = "#/admin/VendorStaffDashboard"
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Inserting Vendor Staff');
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
  vendordetails: any;
  public GetVendor_Dasboard() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: data => {
        debugger
        this.vendordetails = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Vendor Dasboard');
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
        Swal.fire('Issue in Getting RoleType');
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
      "VendorId": this.VendorId,
      "Staff_Name": this.staffName,
      "Phone_Number": this.phoneNumber,
      "Email_Id": this.EmailID,
      "Signature": this.Company_logo,
      "Role": this.Role
    };
    this.RecruitmentServiceService.UpdateVendor_Staff(json).subscribe({
      next: data => {
        debugger
        Swal.fire('Updated Successfully');
        let id = data;
        location.href = "#/admin/VendorStaffDashboard";
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Updating Vendor Staff');
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
    location.href = "#/admin/VendorStaffDashboard";
  }
}






