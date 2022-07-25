import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-dropped-candiadtes-reports',
  templateUrl: './dropped-candiadtes-reports.component.html',
  styleUrls: ['./dropped-candiadtes-reports.component.css']
})
export class DroppedCandiadtesReportsComponent implements OnInit {

  OfferComments: any;
  joblist: any;
  count: any;
  term: any;
  loader:any;
  roleid:any;
  hrlist:any;
  hiringManager:any;
  username:any;
  currentUrl: any;
  constructor(private RecruitementService: RecruitementService) { }


  refresh(){
    location.reload();
  }

  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    this.loader=true;
    this.hiringManager="";
    this.GetClientStaff();
    this.GetCandidateReg();
  }



  GetClientStaff(){
  this.RecruitementService.GetClientStaff()
  
.subscribe({
  next: data => {
    this.hrlist = data;
  }, error: (err) => {
    Swal.fire('Issue in GetClientStaff');
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



  public GetCandidateReg() {
    this.RecruitementService.GetCandidateRegistration()
    
.subscribe({
  next: data => {
    if(this.roleid==2){
      this.joblist = data.filter(x => x.offerAcceptreject == 2 && x.hiringManager==this.username);
    }
    else{
      this.joblist = data.filter(x => x.offerAcceptreject == 2);
    }
   
    this.loader=false;
    this.count = this.joblist.length;
   
  }, error: (err) => {
    Swal.fire('Issue in GetCandidateRegistration ');
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

  fileName = 'DROPPED CANDIDATES REPORT.xlsx';
  exportexcel(): void {
    this.loader = false;
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dropped Candidates');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }

  public GetJobRequirements(){
  
  
    this.RecruitementService.GetCandidateRegistration()
    
.subscribe({
  next: data => {
    debugger
     
      this.joblist = data.filter(x => x.offerAcceptreject == 2  && x.hiringManager == this.hiringManager);
     
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