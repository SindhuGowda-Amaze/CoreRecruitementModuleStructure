//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Candidate Details,displaying Comapny Staff Details, Send Email and Notification function,Approve Candidate,Displaying Slot List Details, update InterviewSchedule Date with notes, Open Pdf in new Window
// and filter code 
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

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

  //Variable Declerations//

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
  staffdetails: any
  Role: any
  slotTime: any
  err: any;
  staffid: any;
  jobid: any;
  candidateid: any;
  date: any;
  notes: any;
  hiringManager: any;
  files: File[] = [];
  interviewGuid: any;
  jobdescription: any;
  jobdescriptionID: any;
  interEmail: any;
  candidateemail: any;

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {


    //Variable Initialisation and Default Method Calls//

    debugger
    this.GetCandidateRegistration();
    this.GetJobDescription();
    this.GetRecruiterStaff()
    this.GetStaffType();
    this.currentUrl = window.location.href;
    this.Role = ""
    this.loader = true;
    this.searchbyctc = "";
    this.searchbynotice = "";
    this.hiringManager = "";
    this.userid = sessionStorage.getItem('userid')
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    debugger


  }


  //Method to Get Candidate Details//

  public GetCandidateRegistration() {
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
          Swal.fire(' Issue in Getting Candidate Registration');
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
          // this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && x.hiringManager == this.username);
          this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.jobListCopy = this.joblist
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.ctclist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.loader = false;
          this.count = this.joblist.length;;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire(' Issue in Getting Candidate Registration');
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
      debugger
      this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          console.log("joblist", this.joblist)
          this.jobListCopy = this.joblist
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.ctclist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.loader = false;
          this.count = this.joblist.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire(' Issue in Getting Candidate Registration');
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


  //Method to displaying Comapny Staff Details//

  GetRecruiterStaff() {
    this.RecruitmentServiceService.GetRecruiterStaff()
      .subscribe(data => {
        this.hrlist = data.filter(x => x.role == "Hiring Manager");
        console.log('hrlist', this.hrlist)
      })
  }


  //Method to filter the data by Notice Period//
  public Fliter() {
    debugger;

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.noticePeriod == this.searchbynotice));

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Candidate Registration');
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

  ///Method to Approve Candidate//
  public changectc() {
    debugger;
    this.RecruitmentServiceService.GetCandidateRegistration()
      .subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.ctc == this.searchbyctc));

        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting Candidate Registration');
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
  //Method to search data by JobTitle//
  public Filterjobs() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string, jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy) || x.jobTitle.toLowerCase().includes(searchCopy));
  }
  public GetDate(even: any) {
    this.date = even.target.value;
    this.GetSlotsMaster();
  }

  public GetJobFilter(even: any) {
    this.jobid = even.target.value;

  }


  public GetStaffID(even: any) {
    this.staffid = even.target.value;

    this.RecruitmentServiceService.GetRecruiterStaff().subscribe({
      next: data => {
        debugger
        this.stafflist = data.filter(x => x.role == "Interview Panel" && x.id == this.staffid);
        this.interEmail = this.stafflist[0].email
      }, error: (err: { error: { message: any; }; }) => {
        // Swal.fire('Issue in Getting Expenses List Web');
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




    console.log('stafflist', this.stafflist);
    for (let i = 0; i <= this.stafflist.length; i++) {
      if (this.staffid == this.stafflist[i].staffid) {
        console.log('email')
      }
    }
    //  this.GetSlotsMaster();

  }
  //Method to Search the Job Tittle//

  public GetStaffType() {
    this.RecruitmentServiceService.GetRecruiterStaff().subscribe({
      next: data => {
        debugger
        this.stafflist = data.filter(x => x.role == "Interview Panel");
      }, error: (err: { error: { message: any; }; }) => {
        // Swal.fire('Issue in Getting Expenses List Web');
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
    this.GetSlotsMaster();
  }

  //Method to Displaying Slot List Details//

  public GetSlotsMaster() {
    debugger
    this.RecruitmentServiceService.GetSlotsMasterByStaffID(this.date, this.staffid).subscribe({
      next: data => {
        debugger
        this.slotslist = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Slots Master ');
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


  public GetCandidateID(job: any) {
    this.candidateid = job.id;
    this.candidateemail = job.email;
  }


  //Method to update InterviewSchedule Date with notes//

  public UpdateInterviewSchedule() {
    console.log("hrlist", this.hrlist, 'email', this.hrlist[0].email);
    console.log("stafflist", this.stafflist, 'email', this.stafflist[0].email);
    console.log("joblist", this.joblist, 'profile candidate', this.candidateemail);
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

          var sub = 'Your Recruiter Scheduled An Interview to You'
          var email = this.candidateemail
          var desc =
            'Dear Interview Panel,<br>I hope you are doing great!<br>This inform you that We have Scheduled an Interview to you.<br>Please Login to Recruitment portal for futher Info about the Interviw and Candidate and will update the further information soon!<br> Please let me know if you have any query!<br>'
          'Thank You!'

          var hrEmail = this.hrlist.email;
          var hrsub = 'Your Recruiter Scheduled An Interview for Candidate'
          var hrdesc =
            'Dear Interview Panel,<br>I hope you are doing great!<br>This inform you that We have Scheduled an Interview to Candidate.<br>Please Login to Recruitment portal for futher Info about the Interviw and Candidate and will update the further information soon!<br> Please let me know if you have any query!<br>'
          'Thank You!'

          var interEmail = this.interEmail;
          var intersub = 'Your Recruiter Scheduled An Interview for Candidate'
          var interdesc =
            'Dear Interview Panel,<br>I hope you are doing great!<br>This inform you that We have Scheduled an Interview to Candidate.<br>Please Login to Recruitment portal for futher Info about the Interviw and Candidate and will update the further information soon!<br> Please let me know if you have any query!<br>'
          'Thank You!'

          this.SendJobMail(sub, desc, email);
          this.SendJobMail(hrsub, hrdesc, hrEmail);
          this.SendJobMail(intersub, interdesc, interEmail);
          this.InsertNotificationInterviewpanel();
          this.ngOnInit();
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

  //Method to Open Pdf in new Window//

  public GetOfferLetter(offer: any) {
    window.open(offer, "_blank")
  }

  //Method to filter the data by CandidateRegistration table//

  public filterbyHirirngManager() {
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && x.hiringManager == this.hiringManager);
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Candidate Registration');
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

  //Method to upload Attachmnet//
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
        alert("Attachment Uploaded");
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

  //Method to get Job Description//

  public GetJobDescription() {
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
      next: (data) => {
        debugger;
        this.jobdescription = data;
        this.loader = false;
        this.count = this.staffdetails.length;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Getting Get Job Description Master ');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }



  //Method to search data by JobTitle//

  public filterjobdescription(even: any) {
    this.jobdescriptionID = even.target.value

    if (this.roleid == '3') {
      debugger;
      this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          this.dummjoblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid));
          this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid && x.jobTitle == this.jobdescriptionID));
          this.jobListCopy = this.joblist
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid));
          this.ctclist = data.filter(x => x.accept == 1 && x.scheduled == 0 && (x.source == 'Vendor' && x.vendorId == this.userid));
          this.loader = false;
          this.count = this.joblist.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire(' Issue in Getting Candidate Registration');
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
          this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && x.jobTitle == this.jobdescriptionID);
          this.jobListCopy = this.joblist
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.ctclist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.loader = false;
          this.count = this.joblist.length;;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire(' Issue in Getting Candidate Registration');
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
          this.joblist = data.filter(x => x.accept == 1 && x.scheduled == 0 && x.jobTitle == this.jobdescriptionID);
          this.jobListCopy = this.joblist
          this.noticeperiodlist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.ctclist = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.loader = false;
          this.count = this.joblist.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire(' Issue in Getting Candidate Registration');
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

  //Method to Send Email//

  public SendJobMail(sub: any, desc: any, email: any) {
    debugger
    var entity3 = {
      'emailto': email,
      'emailsubject': sub,
      'emailbody': desc,
      'attachmenturl': [],
      'cclist': [],
      'bcclist': [],
    }
    this.RecruitmentServiceService.sendemailattachements(entity3).subscribe(res => {
      debugger;
      Swal.fire('Emails Sent');
    })
  }

  //Method to Send Notification//

  public InsertNotificationInterviewpanel() {
    debugger
    var event: any = 'Scheduled Interview';
    this.RecruitmentServiceService.InsertNotificationSBU(event, this.staffid, 'New Interview Scheduled to you')
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
          }
        }, error: (err) => {
          Swal.fire('Issue in Inserting Notification');
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
