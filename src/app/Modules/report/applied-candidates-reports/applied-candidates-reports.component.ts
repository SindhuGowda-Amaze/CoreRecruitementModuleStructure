import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-applied-candidates-reports',
  templateUrl: './applied-candidates-reports.component.html',
  styleUrls: ['./applied-candidates-reports.component.css']
})
export class AppliedCandidatesReportsComponent implements OnInit {
  currentUrl: any;

  constructor(private RecruitementService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
  joblist: any;
  count: any;
  DropJobList: any;
  dummjoblist: any;
  term: any;
  loader: any;
  searchbyctc: any;
  roleid: any;
  userid: any;
  hrlist: any;
  hiringManager: any;
  search: any
  p: any = 1;
  count1: any = 5;
  searchbynotice: any;
  noticeperiodlist: any;
  jobListCopy: any;
  username: any;
  ngOnInit(): void {
    this.hiringManager = "";
    this.searchbynotice = "";
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    this.userid = sessionStorage.getItem('userid')
    this.loader = true;
    this.GetCandidateReg()
    this.GetClientStaff()

  }

  GetClientStaff(){

  this.RecruitementService.GetClientStaff().subscribe({
    next: data => {
      debugger
      this.hrlist = data;
    }, error: (err) => {
      Swal.fire('Issue in Getting ClientStaff');
      // Insert error in Db Here//
      var obj = {
        'PageName': this.currentUrl,
        'ErrorMessage': err.error.message
      }
      this.RecruitementService.InsertExceptionLogs(obj).subscribe(
        data => {
          debugger
        },
      )
    }
  })


}


  refresh() {
    location.reload();
  }

  public GetCandidateReg() {
    this.RecruitementService.GetCandidateRegistration()
    
    
    .subscribe({
      next: data => {
        if (this.roleid == 2) {
          this.joblist = data.filter(x => x.hiringManager == this.username && x.accept == 0 && x.reject == 0);
          this.jobListCopy = this.joblist
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.loader = false;
          this.count = this.joblist.length;
        }
        else {
  
          this.dummjoblist = data.filter(x => x.accept == 0 && x.reject == 0)
          this.joblist = data.filter(x => x.accept == 0 && x.reject == 0);
          this.jobListCopy = this.joblist
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.loader = false;
          this.count = this.joblist.length;
        }
  
     
      }, error: (err) => {
        Swal.fire('Issue in Getting Candidate Registration');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
    
  
    this.RecruitementService.GetJob_Requirements().subscribe({
  next: data => {
    this.DropJobList = data;
  }, error: (err) => {
    Swal.fire('Issue in Getting Job Requirements');
    // Insert error in Db Here//
    var obj = {
      'PageName': this.currentUrl,
      'ErrorMessage': err.error.message
    }
    this.RecruitementService.InsertExceptionLogs(obj).subscribe(
      data => {
        debugger
      },
    )
  }
})
 }

  jobid: any;

  public GetJobFilter(even: any) {
    this.jobid = even.target.value;

    if (even.target.value != 0) {
      this.joblist = this.dummjoblist.filter((x: { jobID: any; }) => x.jobID == this.jobid)
    }
    else {
      this.GetCandidateReg();
    }
  }

  fileName = 'APPLIED CANDIDATES REPORT.xlsx';
  exportexcel(): void {
    this.loader = false;
    /* table id is passed over here */
    let element = document.getElementById('downloadapplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }


  public GetJobRequirements() {


    this.RecruitementService.GetCandidateRegistration()
    
    .subscribe({
      next: data => {
        debugger

        this.joblist = data.filter(x =>  x.accept == 0 && x.reject == 0&& x.hiringManager == this.hiringManager);
  
        this.count = this.joblist.length;
      }, error: (err) => {
        Swal.fire('Issue in Getting Candidate Registration');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
    

    
  }

  public GetOfferLetter(offer: any) {

    window.open(offer, "_blank")
  }

  public changeoption() {
    debugger;

    this.RecruitementService.GetCandidateRegistration()
    
    
.subscribe({
  next: data => {
    debugger
    this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.noticePeriod == this.searchbynotice));
  }, error: (err) => {
    Swal.fire('Issue in GetCandidateRegistration');
    // Insert error in Db Here//
    var obj = {
      'PageName': this.currentUrl,
      'ErrorMessage': err.error.message
    }
    this.RecruitementService.InsertExceptionLogs(obj).subscribe(
      data => {
        debugger
      },
    )
  }
})
    
}  

  public Filterjobs() {
    debugger
    let termcopy = this.term.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string, jobTitle: string; }) => x.jobRefernceID.toString().includes(termcopy) || x.jobTitle.toLowerCase().includes(termcopy));
  }
}
