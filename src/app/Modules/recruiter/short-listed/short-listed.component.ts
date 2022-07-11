import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-short-listed',
  templateUrl: './short-listed.component.html',
  styleUrls: ['./short-listed.component.css']
})
export class ShortListedComponent implements OnInit {

  joblist: any;
  search: any;
  stafflist: any;
  slotslist: any;
  timeid: any;
  count: any;
  DropJobList: any;
  dummjoblist: any;
  loader: any;
  roleid: any;
  userid: any;
  searchbyctc: any;
  searchbynotice: any;
  p: any = 1;
  count1: any = 5;
  jobListCopy: any;
  noticeperiodlist: any;
  ctclist: any;
  hrlist: any;
  username: any
  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loader = true;
    // this.GetCandidateReg();
    this.searchbyctc = "";
    this.searchbynotice = "";
    this.hiringManager="";
    this.RecruitmentServiceService.GetClientStaff().subscribe(data => {
      this.hrlist = data;
    })
    this.GetStaffType();
    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid')
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');


    if (this.roleid == '3') {
      debugger;

      this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {
        this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid));
        this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid));
        this.jobListCopy = this.joblist
        this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid));
        this.ctclist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid));
        this.loader = false;
        this.count = this.joblist.length;

      })

    }
    else if (this.roleid == '2') {

      this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {
        this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
        this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && x.hiringManager == this.username);
        this.jobListCopy = this.joblist
        this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
        this.ctclist = data.filter(x => x.accept == 1 && x.scheduled == 0);
        this.loader = false;
        this.count = this.joblist.length;
      })

    }
    else {

      this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {
        this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
        this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
        this.jobListCopy = this.joblist
        this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
        this.ctclist = data.filter(x => x.accept == 1 && x.scheduled == 0);


        this.loader = false;
        this.count = this.joblist.length;
      })

    }
  }

  public changeoption() {
    debugger;

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {
      this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.noticePeriod == this.searchbynotice));
    });
  }

  public changectc() {
    debugger;

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {
      this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.ctc == this.searchbyctc));
    });
  }

  public Filterjobs() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string, jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy) || x.jobTitle.toLowerCase().includes(searchCopy));
  }



  public GetDate(even: any) {
    this.date = even.target.value;
    this.GetSlotsMaster();
  }




  // public GetCandidateReg() {
  //   this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {
  //     this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
  //     this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
  //     this.loader=false;
  //     this.count = this.joblist.length;
  //   })

  // }

  jobid: any;


  public GetJobFilter(even: any) {
    this.jobid = even.target.value;

    // if (even.target.value != 0) {
    //   this.joblist = this.dummjoblist.filter(x=> x.jobID == this.jobid)
    // }
    // else {
    //   this.GetCandidateReg();
    // }
  }


  staffid: any;

  public GetStaffID(even: any) {
    this.staffid = even.target.value;
    this.GetSlotsMaster();
  }


  public GetStaffType() {
    this.RecruitmentServiceService.GetClientStaff().subscribe(data => {
      this.stafflist = data;
    })

  }

  public GetTimeID(even: any) {
    this.timeid = even.target.value;
  }


  public GetSlotsMaster() {
    debugger
    this.RecruitmentServiceService.GetSlotsMasterByStaffID(this.date, this.staffid).subscribe(data => {
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
    if (this.staffid == null || this.staffid == undefined || this.staffid == 0 ||
      this.date == null || this.date == undefined || this.date == 0 ||
      this.timeid == null || this.timeid == undefined || this.timeid == 0 ||
      this.notes == null || this.notes == undefined || this.notes == 0) {
      Swal.fire('Please Fill the Mandatory Fields')
    }
    else {
      var entity = {
        'ID': this.candidateid,
        'StaffID': this.staffid,
        'Date': this.date,
        'TimeID': this.timeid,
        'Notes': this.notes
      }
      this.RecruitmentServiceService.UpdateCandidateInterviewSchedule(entity).subscribe(data => {
        Swal.fire("Interview Scheduled Successfully");
        // this.GetCandidateReg();
      })
    }

  }


  public GetOfferLetter(offer: any) {
    window.open(offer, "_blank")
  }


  hiringManager: any;
  public GetJobRequirements() {


    this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {
      debugger
      this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && x.hiringManager == this.hiringManager);
      // this.joblist = data.filter(x =>x.hiringManager == this.hiringManager);

      this.count = this.joblist.length;


    })
  }

  checkschedule(){
      
  }

  files: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger

    if(event.addedFiles[0].type=="application/pdf")
    {
      console.log(event);
      this.files.push(event.addedFiles[0]);
      this.uploadattachments();
      console.log("content", this.files);
    }
    else{
      Swal.fire("Please Add Pdf Format");
    }
    
  }

  interviewGuid:any
  onRemove(event:any)
  {
debugger
console.log(event);
this.files.splice(this.files.indexOf(event),1);
  }

  public uploadattachments() {
    debugger
    this.RecruitmentServiceService.UploadImages(this.files).subscribe(res => {
      debugger
      this.interviewGuid = res;
      alert("ATTACHMENT UPLOADED");
    })
  }
}
