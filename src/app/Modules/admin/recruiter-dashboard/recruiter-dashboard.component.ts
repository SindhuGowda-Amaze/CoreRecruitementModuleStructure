import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './recruiter-dashboard.component.html',
  styleUrls: ['./recruiter-dashboard.component.css']
})
export class RecruiterDashboardComponent implements OnInit {

  recuiter: any;
  recruiterlist: any;
  count: any;
  loader:any;
  currentUrl: any
  constructor(private RecruitmentServiceService: RecruitementService,private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetRecruiterMaster();
    this.loader=true;
    
  }
  public GetRecruiterMaster() {
    this.RecruitmentServiceService.GetRecruiterMaster().subscribe({
  next: data => {
    debugger
    this.recruiterlist = data;
        this.loader=false;
        this.count = this.recruiterlist.length;
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

  delete(id: any) {
    this.RecruitmentServiceService.DeleteRecruiterMaster(id).subscribe({
  next: data => {
    debugger
    Swal.fire('Deleted');
    this.GetRecruiterMaster();
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

  Update(id:any) {
    location.href = "#/RecruiterForm/" +id;
  }
}
