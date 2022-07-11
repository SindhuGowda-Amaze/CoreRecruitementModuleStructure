import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrls: ['./clientdashboard.component.css']
})
export class ClientdashboardComponent implements OnInit {
  Job:any;
  count: any;
  search:any;
  loader:any;
  currentUrl:any
  constructor( private RecruitmentServiceService: RecruitementService, private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
   this.GetClientMaster()
   this.loader=true;
  }

  ClientMasterlist:any
  public GetClientMaster() {
    debugger
    this.RecruitmentServiceService.GetClientMaster().subscribe({
      next: data => {
        debugger
        this.ClientMasterlist=data ;
        this.loader=false;
        this.count = this.ClientMasterlist.length;
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

  edit(details: any){
    debugger
    location.href="#/ClientForm/"+ details;
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
          this.RecruitmentServiceService.DeleteClientMaster(details.id).subscribe({
            next: data => {
              debugger
              Swal.fire('Deleted Successfully')
              location.reload();
            }, error: (err: { error: { message: any; }; }) => {
              Swal.fire('Deleted Successfully');
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
      })
    }
}
