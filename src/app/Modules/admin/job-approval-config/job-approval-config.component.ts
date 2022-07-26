
//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains  methods from  
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022


import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-job-approval-config',
  templateUrl: './job-approval-config.component.html',
  styleUrls: ['./job-approval-config.component.css']
})
export class JobApprovalConfigComponent implements OnInit {
 
  //Variable Declerations// 

   AutoApproval:any;
  AutoApproval1:any;
   CompanyName:any;

  constructor() { }

  ngOnInit(): void {
 
    //Variable Initialisation and Default Method Calls//

    // this.AutoApproval=true
    // this.AutoApproval1=true
  }

  update(){
    Swal.fire('Updated Successfully')
  }
}
