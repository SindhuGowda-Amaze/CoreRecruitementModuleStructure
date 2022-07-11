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

  constructor(private RecruitmentServiceService:RecruitementService,private ActivatedRoute:ActivatedRoute) { }
  vendor_Name:any;
  staff_Name:any;
  email_Id:any;
  phone_Number:any;
  staff_Code:any;
  signature:any;
  role_Id:any;
  staffdetails:any;
  count:any;
  loader:any;
  Job:any;
search:any;
  ngOnInit(): void {
  this.GetVendor_Staff(); 
  this.loader=true;
  }

  
  public GetVendor_Staff() {
    this.RecruitmentServiceService.GetVendor_Staff().subscribe(data => {
      this.staffdetails = data;
      this.loader=false;
      this.count=this.staffdetails.length;
     
    })
  }

  edit(id: any) {
    debugger
    location.href = "#/VendorStaffForm/" + id;
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
       this.RecruitmentServiceService.DeleteVendor_Staff(id).subscribe(
      data => {
        debugger
        this.GetVendor_Staff();
        Swal.fire('Deleted');
      }
    )
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
        this.RecruitmentServiceService.EnableVendorStaff(eb).subscribe(
          data => {
            debugger
            Swal.fire('Updated successfully.');
            location.reload();
          },
        )
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
        this.RecruitmentServiceService.EnableVendorStaff(eb).subscribe(
          data => {
            debugger
            Swal.fire('Updated successfully.');
            location.reload();
          },
        )
      }
    })
  }



}
