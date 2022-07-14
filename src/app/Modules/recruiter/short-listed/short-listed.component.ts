import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';


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
  title: any;
  Date: any;
  currentUrl: any;
  staffdetails:any
  Role: any
  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.currentUrl = window.location.href;
   
    this.Role=""
    this.loader = true;
    this.searchbyctc = "";
    this.searchbynotice = "";
    this.hiringManager = "";
    this.RecruitmentServiceService.GetClientStaff()
      .subscribe(data => {
        this.hrlist = data;
      })
    this.GetStaffType();
    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid')
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    if (this.roleid == '3') {
      debugger;
      this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid));
          this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid));
          this.jobListCopy = this.joblist
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid));
          this.ctclist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid));
          this.loader = false;
          this.count = this.joblist.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Getting Candidate Registration');
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })

    }
    else if (this.roleid == '2') {
      this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && x.hiringManager == this.username);
          this.jobListCopy = this.joblist
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.ctclist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.loader = false;
          this.count = this.joblist.length;;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Getting Candidate Registration');
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
    }
    else {

      this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.jobListCopy = this.joblist
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.ctclist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.loader = false;
          this.count = this.joblist.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Getting Candidate Registration');
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
    }


    this.CandidateRegistration();
    this.GetJobDescription();
  }
  public changeoption() {
    debugger;

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.noticePeriod == this.searchbynotice));

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Candidate Registration');
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
      ;
  }
  public changectc() {
    debugger;
    this.RecruitmentServiceService.GetCandidateRegistration()
      .subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.ctc == this.searchbyctc));

        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting Expenses List Web');
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
      ;
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
  jobid: any;
  public GetJobFilter(even: any) {
    this.jobid = even.target.value;

  }
  staffid: any;

  public GetStaffID(even: any) {
    this.staffid = even.target.value;
    this.GetSlotsMaster();
  }
  public GetStaffType() {
    this.RecruitmentServiceService.GetClientStaff().subscribe({
      next: data => {
        debugger
        this.stafflist = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Expenses List Web');
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
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
    this.RecruitmentServiceService.GetSlotsMasterByStaffID(this.date, this.staffid).subscribe({
      next: data => {
        debugger
        this.slotslist = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Slots Master ');        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
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
      this.RecruitmentServiceService.UpdateCandidateInterviewSchedule(entity).subscribe({
        next: data => {
          debugger
          Swal.fire("Interview Scheduled Successfully");
          this.SendMailEmployee()

        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Interview Scheduled');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
    }
  }
  public GetOfferLetter(offer: any) {
    window.open(offer, "_blank")
  }
  hiringManager: any;
  public GetJobRequirements() {
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && x.hiringManager == this.hiringManager);
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Candidate Registration');
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }
  checkschedule() {
  }
  files: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger

    if (event.addedFiles[0].type == "application/pdf") {
      console.log(event);
      this.files.push(event.addedFiles[0]);
      this.uploadattachments();
      console.log("content", this.files);
    }
    else {
      Swal.fire("Please Add Pdf Format");
    }

  }
  interviewGuid: any
  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  public uploadattachments() {
    debugger
    this.RecruitmentServiceService.UploadImages(this.files).subscribe({
      next: (res: any) => {
        debugger
        this.interviewGuid = res;
        alert("ATTACHMENT UPLOADED");
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Upload Images');
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  
  // public jobTitle() {
  //   debugger;

  //   this.RecruitmentServiceService.GetClientStaff().subscribe(data => {
  //     this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.jobTitle == this.title));
  //   });
  // }



  public CandidateRegistration () {
    debugger;

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {

      this.joblist = data
    });
  }



  public GetJobDescription() {
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
      next: data => {
        debugger
        this.staffdetails = data;
        this.loader=false;
        this.count=this.staffdetails.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Get Job Description Master ');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

  }


  public SendMailEmployee() {

    debugger

    var entity3 = {

      'emailto': 'gmrmadhavreddy416@gmail.com',

      // 'emailto': 'divyashree@amazeinc.in',

      'emailsubject': 'Recruiter Scheduled Interview',

      'emailbody': 'Dear Applicant,<br><br><br>We would like to extend a warm welcome to you into ALI family.<br><br> We thank you for choosing to work for ALI. We are delighted to have you join us and support us in our journey - "Make the most of your Energy"<br><br>  <br>We strongly believe that an Organization is made up of People and ultimately its the People, who will make the difference between success and failure. We believe that you have the potential and enthusiasm that will bring in fresh blood into our organization. <br>You may login to fill joining form and see other details  with below link -<br>Url - @@OnboardingPortalURL@@<br>User Name - @@UserName@@<br>Password -  @@Password@@<br><br>Note: If any of the links is not opening on a click, please copy the link in Internet Explorer and then access the same.<br>',

      'attachmenturl': this.files,

      'cclist': 'sindhugowda.amazeinc@gmail.com',

      'bcclist': 'sindhugowda.amazeinc@gmail.com',

    }



    this.RecruitmentServiceService.sendemailattachements(entity3).subscribe(res => {

      debugger;



      // Swal.fire('Letter Generated and Sent Successfully');

      Swal.fire('Checklist Sent to Respective Department');

    })



  }



}
