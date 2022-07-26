
//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains  methods from   GetClientMaster,DeleteClientMaster
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

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

  //Variable Declerations// 

  Job: any;
  count: any;
  search: any;
  loader: any;
  currentUrl: any;
  ClientMasterlist: any;

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  
    //Variable Initialisation and Default Method Calls//

    this.GetClientMaster()
    this.currentUrl = window.location.href;
    this.loader = true;
  }

// Methods to get Count of GetClientMaster,DeleteClientMaster//

  public GetClientMaster() {
    debugger
    this.RecruitmentServiceService.GetClientMaster().subscribe({
      next: data => {
        debugger
        this.ClientMasterlist = data;
        this.loader = false;
        this.count = this.ClientMasterlist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting ClientMaster');
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

  edit(id: any) {
    debugger
    location.href = "#/admin/Clientform/ " + id;
  }
  public delete(details: any) {
    debugger
    var json = {
      "ID": details.id
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
            Swal.fire(' Issue in Deleting  Successfully');
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
