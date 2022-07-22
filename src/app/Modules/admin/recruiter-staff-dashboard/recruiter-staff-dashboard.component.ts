import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
@Component({
  selector: 'app-recruiter-staff-dashboard',
  templateUrl: './recruiter-staff-dashboard.component.html',
  styleUrls: ['./recruiter-staff-dashboard.component.css']
})
export class RecruiterStaffDashboardComponent implements OnInit {

  stafflist: any;
  count: any;
  search: any;

  constructor(private RecruitmentServiceService: RecruitementService) { }

  ngOnInit(): void {
    this.GetRecruiterStaff();
  }
  public GetRecruiterStaff() {
    this.RecruitmentServiceService.GetRecruiterStaff().subscribe(
      data => {
        this.stafflist = data
        this.count = this.stafflist.length;
      })
  }




  public delete(id: any) {
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
        this.RecruitmentServiceService.DeleteRecruiterStaff(id).subscribe(
          data => {
            debugger
            Swal.fire('Deleted');
            this.GetRecruiterStaff();
          })
      }
    })
  }


  Update(staff: any) {
    location.href = "#/admin/RecruiterForm/" + staff.id
  }


  public DisableStaff(id: any) {
    debugger
    var eb = {
      'ID': id,
      'Enable_Disable': 1
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Disable the Recruiter',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Disable it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.RecruitmentServiceService.EnableCompanyStaff(eb).subscribe(
          data => {
            debugger
            Swal.fire('Disabled Successfully.');
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
      text: 'Do you want to Enable the Recruiter',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Enable it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.RecruitmentServiceService.EnableCompanyStaff(eb).subscribe(
          data => {
            debugger
            Swal.fire('Enabled Successfully.');
            location.reload();
          },
        )
      }
    })
  }
}
