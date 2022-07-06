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


  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
  result: any;
  Actions: any;
  id: any;
  Description:any;
  ngOnInit(): void {
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
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe(
      data => {
        debugger
        this.result = data;
        this.result = this.result.filter((x: { id: any; }) => x.id == Number(this.id));
        this.Description = this.result[0].description;
        this.role_Id = this.result[0].role;

      })
  }
  Save() {
    debugger;
    var json = {
     
      "Role": this.role_Id,
      "Description": this.Description,
     
    };
    this.RecruitmentServiceService.InsertJobDescriptionMaster(json).subscribe(
      data => {
        debugger
        let id = data;
        Swal.fire("Successfully saved!!")
        location.href = "#/JobDescriptionDash"
      })
  }
  vendordetails: any;
  public GetVendor_Dasboard() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe(data => {
      this.vendordetails = data;

    })

  }
  roleList:any;
  public GetRoleType() {
    debugger
    this.RecruitmentServiceService.GetRoleType().subscribe(
      data => {
      this.roleList = data
    
    })

  }

  Update() {
    debugger
    var json = {
      "ID": this.id,
      "Role": this.role_Id,
      "Description": this.Description,
    };
    this.RecruitmentServiceService.UpdateJobDescriptionMaster(json).subscribe(
      data => {
        debugger
        Swal.fire("Updated Sucessfully");
        let id = data;
        location.href = "#/JobDescriptionDash";

      }
    )
  }
  cancel(){
    location.href = "#/JobDescriptionDash";
  }
}
