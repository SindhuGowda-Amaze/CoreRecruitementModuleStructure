import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
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
  constructor(private RecruitementService: RecruitementService) { }

  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roleid');
   this.loader=true;
   this.hiringManager="";
   this.GetCandidateReg()

   
   this.RecruitementService.GetClientStaff().subscribe(data => {
     this.hrlist = data;
   })
  }
  
  refresh(){
    location.reload();
  }
  public GetCandidateReg() {
    this.RecruitementService.GetCandidateRegistration().subscribe(data => {
      this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
      this.loader=false;
      this.count = this.joblist.length;
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


  hiringManager:any;
  public GetJobRequirements(){
  
  
    this.RecruitementService.GetCandidateRegistration().subscribe(data => {
      debugger
     
      this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0  && x.hiringManager == this.hiringManager);
     
      this.count = this.joblist.length;
   
  
    })
  
  }
}

