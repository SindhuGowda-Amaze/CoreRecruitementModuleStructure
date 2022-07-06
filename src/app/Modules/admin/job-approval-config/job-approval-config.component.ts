import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-job-approval-config',
  templateUrl: './job-approval-config.component.html',
  styleUrls: ['./job-approval-config.component.css']
})
export class JobApprovalConfigComponent implements OnInit {

  AutoApproval:any;
  AutoApproval1:any;
  constructor() { }

  ngOnInit(): void {
    this.AutoApproval=true
    this.AutoApproval1=true
  }

  CompanyName:any;
  update(){
    Swal.fire('Updated Successfully')
  }
}
