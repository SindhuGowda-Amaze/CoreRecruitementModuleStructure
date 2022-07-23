import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-job-description-form',
  templateUrl: './job-description-form.component.html',
  styleUrls: ['./job-description-form.component.css']
})
export class JobDescriptionFormComponent implements OnInit {

  signature: any;
  staff_Name: any;
  phone_Number: any;
  Email_ID: any;
  staff_Code: any;
  role_Id: any;
  vendor_Name: any;
  Role: undefined;


  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
  result: any;
  Actions: any;
  id: any;
  Description:any;
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

  GetVendor_Staff() {
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
  next: data => {
    debugger
    this.result = data;
        this.result = this.result.filter((x: { id: any; }) => x.id == Number(this.id));
        this.Description = this.result[0].description;
        this.role_Id = this.result[0].role;
  }, error: (err) => {
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
  Save() {
    debugger;  
    if(this.role_Id==undefined || this.role_Id==0 ||
      this.Description==undefined || this.Description==""
      )
      {
        Swal.fire("Please fill all fields!!");
      }
      else{
        var json = {
     
          "Role": this.role_Id,
          "Description": this.Description,
         
        };
        this.RecruitmentServiceService.InsertJobDescriptionMaster(json).subscribe({
          next: data => {
            debugger
            let id = data;
            Swal.fire("Successfully Saved!!")
            location.href = "#/admin/JobDescriptionDash"
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
    Swal.fire(' Getting Role Type');
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
      "Role": this.role_Id,
      "Description": this.Description,
    };
    this.RecruitmentServiceService.UpdateJobDescriptionMaster(json).subscribe({
  next: data => {
    debugger
    Swal.fire("Updated Sucessfully");
        let id = data;
        location.href = "#admin/JobDescriptionDash";

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
    location.href = "#/admin/JobDescriptionDash";
  }
}
