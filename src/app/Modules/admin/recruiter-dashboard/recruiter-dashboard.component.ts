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
  constructor(private RecruitmentServiceService: RecruitementService,private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.GetRecruiterMaster();
    this.loader=true;
    
  }


  public GetRecruiterMaster() {
    this.RecruitmentServiceService.GetRecruiterMaster().subscribe(
      data => {
        this.recruiterlist = data;
        this.loader=false;
        this.count = this.recruiterlist.length;
      })

  }

  delete(id: any) {
    this.RecruitmentServiceService.DeleteRecruiterMaster(id).subscribe(
      data => {
        debugger
        Swal.fire('Deleted');
        this.GetRecruiterMaster();
      })
  }

  Update(id:any) {
    location.href = "#/RecruiterForm/" +id;
  }
}
