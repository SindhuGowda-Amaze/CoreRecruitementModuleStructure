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
  constructor(private RecruitementService: RecruitementService) { }

  ngOnInit(): void {
    this.hiringManager = "";
    this.searchbynotice = "";
    this.userid = sessionStorage.getItem('userid')
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');

    this.loader = true;

    this.RecruitementService.GetClientStaff().subscribe(data => {
      this.hrlist = data;
    })

    this.GetCandidateReg();
    this.GetStaffType();
    if (this.roleid == '3') {
      debugger;
      this.RecruitementService.GetJob_Requirements().subscribe(data => {
        this.DropJobList = data.filter(x => (x.source == "Vendor" && x.vendorId == this.userid));
        this.loader = false;
      })
    }
    else {

      this.RecruitementService.GetJob_Requirements().subscribe(data => {
        this.DropJobList = data;
        this.loader = false;
      })
    }
  }

  refresh() {
    location.reload();
  }

  public GetDate(even: any) {
    this.date = even.target.value;
    this.GetSlotsMaster();
  }




  dummjoblist: any;

  public GetCandidateReg() {
    this.RecruitementService.GetCandidateRegistration().subscribe(data => {
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


    })
  }

  public changeoption() {
    debugger;

    this.RecruitementService.GetCandidateRegistration().subscribe(data => {
      this.noticeperiodlist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.noticePeriod == this.searchbynotice));
    });
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

  staffid: any;

  public GetStaffID(even: any) {
    this.staffid = even.target.value;
    this.GetSlotsMaster();
  }


  public GetStaffType() {
    this.RecruitementService.GetStaffs().subscribe(data => {
      this.stafflist = data;
    })
  }

  public GetTimeID(even: any) {
    this.timeid = even.target.value;
  }


  public GetSlotsMaster() {
    debugger
    this.RecruitementService.GetSlotsMasterByStaffID(this.date, this.staffid).subscribe(data => {
      this.slotslist = data;
      debugger
    })
  }

  candidateid: any;

  public GetCandidateID(candidateid: any) {
    this.candidateid = candidateid;
  }


  date: any;
  notes: any;

  public UpdateInterviewSchedule() {
    var entity = {
      'ID': this.candidateid,
      'StaffID': this.staffid,
      'Date': this.date,
      'TimeID': this.timeid,
      'Notes': this.notes
    }
    this.RecruitementService.UpdateCandidateInterviewSchedule(entity).subscribe(data => {
      Swal.fire("Interview Scheduled Successfully");
      this.GetCandidateReg();
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


  hiringManager: any;
  public GetJobRequirements() {


    this.RecruitementService.GetCandidateRegistration().subscribe(data => {
      debugger

      this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && x.hiringManager == this.hiringManager);

      this.count = this.joblist.length;


    })




  }

}
