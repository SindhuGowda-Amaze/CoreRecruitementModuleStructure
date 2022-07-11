import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-joined-candidates-report',
  templateUrl: './joined-candidates-report.component.html',
  styleUrls: ['./joined-candidates-report.component.css']
})
export class JoinedCandidatesReportComponent implements OnInit {
  
  OfferComments: any;
  joblist: any;
  count: any;
  term: any;
  loader:any;
  hrlist:any;
  jobListCopy:any;
  p: any = 1;
  count1: any = 5;
  roleid:any;
  username:any;
  currentUrl: any;
  hiringManager:any;

  constructor(private RecruitementService: RecruitementService){ }

 
  refresh(){
    location.reload();
  }


  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    this.loader=true;
    this.hiringManager="";
    this.GetCandidateReg()
    this.GetClientStaff()

  }

  GetClientStaff(){
  this.RecruitementService.GetClientStaff()
  .subscribe({
    next: data => {
      debugger
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
          this.joblist = data.filter(x => x.offerAcceptreject == 1 && x.hiringManager==this.username);
          this.jobListCopy=this.joblist
        }
        else{
          this.joblist = data.filter(x => x.offerAcceptreject == 1);
          this.jobListCopy=this.joblist
        }
   
        this.loader=false;
        this.count = this.joblist.length;
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
    let searchCopy = this.term.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string,jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy)||x.jobTitle.toLowerCase().includes(searchCopy));
  }

  public GetOfferLetter(offer:any) {
    window.open(offer, "_blank")
  }

  fileName = 'JOINED CANDIDATES REPORT.xlsx';
  exportexcel(): void {
    this.loader = true;
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Joined Candidates');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }
  
 
  public GetJobRequirements(){
  
  
    this.RecruitementService.GetCandidateRegistration()
    .subscribe({
      next: data => {
        debugger
     
      this.joblist = data.filter(x => x.offerAcceptreject == 1 && x.hiringManager == this.hiringManager);
     
      this.count = this.joblist.length;
   
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
}