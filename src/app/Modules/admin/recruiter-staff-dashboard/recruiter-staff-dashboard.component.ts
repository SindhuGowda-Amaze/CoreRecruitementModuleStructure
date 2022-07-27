//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains To Displaying Company Staff Details,Delete the Data from CompanyStaff,EnableCompanyStaff
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
@Component({
  selector: 'app-recruiter-staff-dashboard',
  templateUrl: './recruiter-staff-dashboard.component.html',
  styleUrls: ['./recruiter-staff-dashboard.component.css']
})
export class RecruiterStaffDashboardComponent implements OnInit {
//Variable Declerations//

  stafflist: any;
  count: any;
  search: any;

  constructor(private RecruitmentServiceService: RecruitementService) { }

  ngOnInit(): void {

    //Variable Initialisation and Default Method Calls//

    this.GetRecruiterStaff();
  }
  
  
  // Methods to get Count of Company Staff//

  public GetRecruiterStaff() {
    this.RecruitmentServiceService.GetRecruiterStaff().subscribe(
      data => {
        this.stafflist = data
        this.count = this.stafflist.length;
      })
  }

  // Method to delete  the  data  from RecruiterStaff Table//

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

  // Method to Get Routing with Respect of URL//

  Update(staff: any) {
    location.href = "#/admin/RecruiterForm/" + staff.id
  }
 
  //Method to EnableStaff from CompanyrStaff//


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

    //Method to DisableStaff from CompanyrStaff//

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
