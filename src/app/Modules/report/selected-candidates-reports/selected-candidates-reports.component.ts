import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-selected-candidates-reports',
  templateUrl: './selected-candidates-reports.component.html',
  styleUrls: ['./selected-candidates-reports.component.css']
})
export class SelectedCandidatesReportsComponent implements OnInit {
  joblist: any;
  count: any;
  search: any;
  date: any;
  loader:any;
  roleid:any;
  hrlist:any;
  hiringManager:any;
  currentUrl: any;
  constructor(private RecruitementService: RecruitementService) { }

  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roleid');
   this.loader=true;
   this.hiringManager="";
   this.GetCandidateReg();
   this.GetClientStaff();

  }
  
  GetClientStaff(){
    this.RecruitementService.GetClientStaff()
    
    .subscribe({
      next: data => {
        debugger
        this.hrlist = data;
      }, error: (err) => {
        Swal.fire('Issue in Getting  ClientStaff');
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
        this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
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

  fileName = 'SELECTED CANDIDATES REPORT.xlsx';
  exportexcel(): void {
    this.loader = true;
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Selected Candidates');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }

  public GetOfferLetter(offer:any) {
    window.open(offer, "_blank")
  }



  public GetJobRequirements(){
  
  
    this.RecruitementService.GetCandidateRegistration()
    
    .subscribe({
      next: data => {
        debugger
     
        this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0  && x.hiringManager == this.hiringManager);
       
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
}

