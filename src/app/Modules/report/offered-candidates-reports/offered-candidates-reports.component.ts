import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-offered-candidates-reports',
  templateUrl: './offered-candidates-reports.component.html',
  styleUrls: ['./offered-candidates-reports.component.css']
})
export class OfferedCandidatesReportsComponent implements OnInit {
  OfferComments: any;
  joblist: any;
  count: any;
  term: any;
  loader:any;
  roleid:any;
  hrlist:any;
  username:any;
  currentUrl: any;
  constructor(private RecruitementService: RecruitementService) { }

  ngOnInit(): void {
 
    this.hiringManager="";
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    this.GetCandidateRegistration();
    this.GetClientStaff()
  
  }
  GetClientStaff(){ this.RecruitementService.GetClientStaff()
    
    .subscribe({
      next: data => {
        debugger
        this.hrlist = data;
      }, error: (err) => {
        Swal.fire('Issue in Get ClientStaff');
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
 
  GetCandidateRegistration()
  { 
     this.RecruitementService.GetCandidateRegistration()
    .subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0);
    
        this.count = this.joblist.length;
      }, error: (err) => {
        Swal.fire('Issue in GetCandidate Registration');
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

  refresh(){
    location.reload();
  }
  public GetCandidateReg() {
    this.RecruitementService.GetCandidateRegistration()
    
    .subscribe({
      next: data => {
        if(this.roleid==2){
          this.joblist = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0 && x.hiringManager==this.username);
        }
        else
        {
          this.joblist = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0);
        // this.jobListCopy = this.joblist
        }
  
       
        
        this.loader=false;
        this.count = this.joblist.length;
      }, error: (err) => {
        Swal.fire('Issue in GetCandidate Registration');
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

  public GetOfferLetter(offer:any) {
    window.open(offer, "_blank")
  }

  fileName = 'OFFERED CANDIDATES REPORT.xlsx';
  //  public exportexcel(): void {
  
  
  
  //   let element = document.getElementById('downloadaplication');
  //   debugger
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  //   debugger

  
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  
  //   XLSX.writeFile(wb, this.fileName);
  //   this.loader = false;
  // }
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  hiringManager:any;
  public GetJobRequirements(){
  
  
    this.RecruitementService.GetCandidateRegistration()
    .subscribe({
      next: data => {
        debugger
     
      this.joblist = data.filter(x => (x.offered == 1 && x.offerAcceptreject == 0) && x.hiringManager == this.hiringManager);
     
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
}
