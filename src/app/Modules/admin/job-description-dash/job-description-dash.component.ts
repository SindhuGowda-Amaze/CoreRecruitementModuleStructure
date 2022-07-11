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

  constructor(private RecruitmentServiceService:RecruitementService,private ActivatedRoute:ActivatedRoute) { }
  vendor_Name:any;
  staff_Name:any;
  email_Id:any;
  phone_Number:any;
  staff_Code:any;
  signature:any;
  role_Id:any;
  Job:any;
  staffdetails:any;
  count:any;
  loader:any;
search:any;
  ngOnInit(): void {
  this.GetJobDescriptionMaster(); 
  this.loader=true;
  }

  
  public GetJobDescriptionMaster() {
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe(data => {
      this.staffdetails = data;
      this.loader=false;
      this.count=this.staffdetails.length;
     
    })
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
        this.RecruitmentServiceService.DeleteJobDescriptionMaster(id).subscribe(
          data => {
            debugger
            this.GetJobDescriptionMaster();
            Swal.fire('Deleted');
          }
        )
      }
    })
  }

  edit(id: any) {
    debugger
    location.href = "#/JobDescriptionForm/" + id;
  }


  public DisableStaff(id: any) {

    var eb = {
  
      'ID': id,
  
      'Enable_Disable': 1
  
    }
  
    this.RecruitmentServiceService.EnableVendorStaff(eb).subscribe(
      data => {
        debugger
        Swal.fire('Updated successfully.');
        location.reload();
      },
    )
  }
  
  public DisableStaff1(id: any) {
  
    var eb = {
  
      'ID': id,
  
      'Enable_Disable': 0
  
    }
  
    this.RecruitmentServiceService.EnableVendorStaff(eb).subscribe(
      data => {
        debugger
        Swal.fire('Updated successfully.');
        location.reload();
      },
    )
  }
}
