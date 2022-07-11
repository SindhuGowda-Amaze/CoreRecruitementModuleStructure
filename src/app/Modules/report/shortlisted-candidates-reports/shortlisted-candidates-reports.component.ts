import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-shortlisted-candidates-reports',
  templateUrl: './shortlisted-candidates-reports.component.html',
  styleUrls: ['./shortlisted-candidates-reports.component.css']
})
export class ShortlistedCandidatesReportsComponent implements OnInit {
  joblist: any;
  search: any;
  stafflist: any;
  slotslist: any;
  timeid: any;
  count: any;
  DropJobList: any;
  loader: any;
  roleid: any;
  userid: any;
  p: any = 1;
  count1: any = 5;
  hrlist: any;
  searchbynotice: any;
  noticeperiodlist: any;
  username: any;
  dummjoblist: any;
  jobid: any;
  staffid: any;
  candidateid: any;
  hiringManager: any;
  date: any;
  notes: any;
  currentUrl: any;
  constructor(private RecruitementService: RecruitementService) { }

  ngOnInit(): void {
    this.hiringManager = "";
    this.searchbynotice = "";
    this.userid = sessionStorage.getItem('userid')
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');

    this.loader = true;
    this.GetClientStaff();
    this.GetCandidateReg();
    this.GetStaffType();
    this.GetJob_Requirements()
  }

  public GetJob_Requirements(){

    if (this.roleid == '3') {
      debugger;
      this.RecruitementService.GetJob_Requirements()
      .subscribe({
        next: data => {
          this.DropJobList = data.filter(x => (x.source == "Vendor" && x.vendorId == this.userid));
        this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in GetJob_Requirements');
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
    else {

      this.RecruitementService.GetJob_Requirements()
      .subscribe({
        next: data => {
          debugger
          this.DropJobList = data;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in GetJob_Requirements');
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
 
  refresh() {
    location.reload();
  }

  public GetDate(even: any) {
    this.date = even.target.value;
    this.GetSlotsMaster();
  }


  public GetCandidateReg() {
    this.RecruitementService.GetCandidateRegistration()
    .subscribe({
      next: data => {
        debugger
        if (this.roleid == 2) {
          this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 );
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.count = this.joblist.length;
        }
        else {
          this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.count = this.joblist.length;
        }
  
  
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

  public changeoption() {
    debugger;

    this.RecruitementService.GetCandidateRegistration()
    
    .subscribe({
      next: data => {
        debugger
        this.noticeperiodlist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.noticePeriod == this.searchbynotice));
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

;

  public GetJobFilter(even: any) {
    this.jobid = even.target.value;

    if (even.target.value != 0) {
      this.joblist = this.dummjoblist.filter((x: { jobID: any; }) => x.jobID == this.jobid)
    }
    else {
      this.GetCandidateReg();
    }
  }

 

  public GetStaffID(even: any) {
    this.staffid = even.target.value;
    this.GetSlotsMaster();
  }


  public GetStaffType() {
    this.RecruitementService.GetStaffs()
    
    .subscribe({
      next: data => {
        debugger
        this.stafflist = data;
      }, error: (err) => {
        Swal.fire('Issue in GetStaffs');
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
    


  public GetTimeID(even: any) {
    this.timeid = even.target.value;
  }


  public GetSlotsMaster() {
    debugger
    this.RecruitementService.GetSlotsMasterByStaffID(this.date, this.staffid)
    .subscribe({
      next: data => {
        debugger
        this.slotslist = data;
      }, error: (err) => {
        Swal.fire('Issue in GetSlotsMasterByStaffID');
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



  public GetCandidateID(candidateid: any) {
    this.candidateid = candidateid;
  }


  public UpdateInterviewSchedule() {
    var entity = {
      'ID': this.candidateid,
      'StaffID': this.staffid,
      'Date': this.date,
      'TimeID': this.timeid,
      'Notes': this.notes
    }
    this.RecruitementService.UpdateCandidateInterviewSchedule(entity)
    .subscribe({
      next: data => {
        debugger
        Swal.fire("Interview Scheduled Successfully");
        this.GetCandidateReg();
      }, error: (err) => {
        Swal.fire('Issue in UpdateCandidateInterviewSchedule');
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

  fileName = 'SHORTLISTED CANDIDATES REPORT.xlsx';
  exportexcel(): void {
    this.loader = true;
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Shortlisted Candidates');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }


 
  public GetJobRequirements() {


    this.RecruitementService.GetCandidateRegistration()
    .subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && x.hiringManager == this.hiringManager);

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
