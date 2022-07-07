import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-staff-dashboard',
  templateUrl: './client-staff-dashboard.component.html',
  styleUrls: ['./client-staff-dashboard.component.css']
})
export class ClientStaffDashboardComponent implements OnInit {

  count: any;
  search:any;
  loader:any;

  constructor( private RecruitmentServiceService: RecruitementService, private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this.GetClientStaff();
   this.loader=true;
  }

  ClientStaffList:any
  
  public GetClientStaff() {
    debugger
    this.RecruitmentServiceService.GetClientStaff().subscribe(data=>{
      debugger
      this.ClientStaffList=data ;
      this.loader=false;
      this.count = this.ClientStaffList.length;
     })
  }

  edit(details: any){
    debugger
    location.href="#admin/ClientStaffForm/"+ details;
    }


  public delete(details: any) {
    debugger
    var json={
      "ID":details.id
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.RecruitmentServiceService.DeleteClientStaff(details.id).subscribe(
          data => {
            debugger        
         Swal.fire('Deleted Successfully')
         location.reload();
        })
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
        this.RecruitmentServiceService.EnableClientStaff(eb).subscribe(
          data => {
            debugger
            Swal.fire('Disable successfully.');
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
        this.RecruitmentServiceService.EnableClientStaff(eb).subscribe(
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
