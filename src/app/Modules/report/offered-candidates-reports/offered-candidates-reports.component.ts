import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-offered-candidates-reports',
  templateUrl: './offered-candidates-reports.component.html',
  styleUrls: ['./offered-candidates-reports.component.css']
})
export class OfferedCandidatesReportsComponent implements OnInit {

  constructor(private RecruitementService: RecruitementService) { }
  OfferComments: any;
  joblist: any;
  count: any;
  term: any;
  loader:any;
  roleid:any;
  hrlist:any;
  username:any;
  ngOnInit(): void {
    this.hiringManager="";
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    this.RecruitementService.GetClientStaff().subscribe(data => {
      this.hrlist = data;
    })

    this.RecruitementService.GetCandidateRegistration().subscribe(data => {
      debugger
      this.joblist = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0);
 
      this.count = this.joblist.length;
    })
  }
  refresh(){
    location.reload();
  }
  public GetCandidateReg() {
    this.RecruitementService.GetCandidateRegistration().subscribe(data => {
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
    })

    
  }

  public GetOfferLetter(offer:any) {
    window.open(offer, "_blank")
  }

  fileName = 'OFFERED CANDIDATES REPORT.xlsx';
  exportexcel(): void {
    this.loader = true;
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Offered Candidates');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }

  hiringManager:any;
  public GetJobRequirements(){
  
  
    this.RecruitementService.GetCandidateRegistration().subscribe(data => {
      debugger
     
      this.joblist = data.filter(x => (x.offered == 1 && x.offerAcceptreject == 0) && x.hiringManager == this.hiringManager);
     
      this.count = this.joblist.length;
   
  
    })
  
  }
}
