
//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains  methods from GetCandidateRegistration,GetRecruiterStaff,UpdateCandidateRegistrationAcceptReject,sendemailattachements
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022


import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applied-candidates',
  templateUrl: './applied-candidates.component.html',
  styleUrls: ['./applied-candidates.component.css'],
})
export class AppliedCandidatesComponent implements OnInit {

    
  //Variable Declerations//

  err: any;
  joblist: any;
  count: any;
  DropJobList: any;
  dummjoblist: any;
  term: any;
  jobid: any;
  search: any;
  roleid: any;
  loader: any;
  userid: any;
  searchbyctc: any;
  searchbynotice: any;
  noticeperiodlist: any;
  ctclist: any;
  p: any = 1;
  count1: any = 5;
  hrlist: any;
  hiringManager: any;
  username: any;
  currentUrl: any;
  job: any;
  Role: any;
  staffdetails: any;
  jobdescription: any;
  jobdescriptionID: any;
  recruiter:any;

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
 

  ngOnInit(): void {

       //Variable Initialisation and Default Method Calls//

    this.GetJobDescription();
    this.Role = '';
    this.currentUrl = window.location.href;
    this.hiringManager = '';
    this.searchbynotice = '';
    this.searchbyctc = '';

    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid');
    this.username = sessionStorage.getItem('UserName');

    this.GetRecruiterStaff();
    this.GetCandidateReg();
  }

   // Methods to get Count of GetCandidateRegistration,GetRecruiterStaff,UpdateCandidateRegistrationAcceptReject,sendemailattachements
  public GetCandidateReg() {
    if (this.roleid == '3') {
      debugger;
      this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
        next: (data) => {
          debugger;
          this.dummjoblist = data.filter(
            (x) =>
              x.accept == 0 &&
              x.reject == 0 &&
              x.source == 'Vendor' &&
              x.vendorId == this.userid
          );
          this.joblist = data.filter(
            (x) =>
              x.accept == 0 &&
              x.reject == 0 &&
              x.source == 'Vendor' &&
              x.vendorId == this.userid
          );
          this.noticeperiodlist = data.filter(
            (x) =>
              x.accept == 0 &&
              x.reject == 0 &&
              x.source == 'Vendor' &&
              x.vendorId == this.userid
          );
          this.ctclist = data.filter(
            (x) =>
              x.accept == 0 &&
              x.reject == 0 &&
              x.source == 'Vendor' &&
              x.vendorId == this.userid
          );

          this.count = this.joblist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Getting Candidate Registration');
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
    } else if (this.roleid == 2) {
      this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
        next: (data) => {
          debugger;
          this.dummjoblist = data.filter((x) => x.accept == 0 && x.reject == 0);
          this.joblist = data.filter((x) => x.accept == 0 && x.reject == 0);
          this.noticeperiodlist = data.filter(
            (x) => x.accept == 0 && x.reject == 0
          );
          this.ctclist = data.filter((x) => x.accept == 0 && x.reject == 0);
          this.count = this.joblist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Getting Candidate Registration');
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
    } else {
      this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
        next: (data) => {
          debugger;
          this.dummjoblist = data.filter((x) => x.accept == 0 && x.reject == 0);
          this.joblist = data.filter((x) => x.accept == 0 && x.reject == 0);
          this.noticeperiodlist = data.filter(
            (x) => x.accept == 0 && x.reject == 0
          );
          this.ctclist = data.filter((x) => x.accept == 0 && x.reject == 0);
          this.count = this.joblist.length;

          },error: (err: { error: { message: any } }) => {
            Swal.fire(' Issue in Getting Candidate Registration');
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

  }

  public GetRecruiterStaff() {
    this.RecruitmentServiceService.GetRecruiterStaff().subscribe({
      next: (data) => {
        debugger;
        this.hrlist = data.filter(x => x.role == "Hiring Manager");
        this.recruiter=data.filter(x=>x.role=="Recruiter")
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire(' Issue in Getting Recruiter Staff');
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

  public Accept(id: any, shortlistionNotes: any) {
    Swal.fire({
      title: 'Reason for Shortlisting the Candidate',
      html: `<input type="text" id="Reason" class="swal2-input" placeholder="Comments" style="height:100px">`,
      confirmButtonText: 'Shortlist',
      confirmButtonColor: '#f18235',
      focusConfirm: false,
      preConfirm: () => {
        debugger;
        this.loader = true;
        const Reason: any = document.getElementById('Reason') as HTMLElement;
        var entity = {
          ID: id,
          ReasonForCancel: Reason.value,
        };
        this.RecruitmentServiceService.UpdateCandidateRegistrationAcceptReject(
          id,
          1,
          Reason.value
        ).subscribe(
          (res) => {
            let test = res;
            Swal.fire(
              'Shortlisted!',
              'Candidate has been shortlisted',
              'success'
            );
            var sub = 'Hiring Manager Shortlisted Candidates'
            var email = 'sindhugowda.amazeinc@gmail.com'
            var desc = 
            'Hello Recruiter,I hope you are doing great!<br>We are Happy to inform you that Your Resumes have been shortlisted.Please Login to Recruitment portal for futher Info and will update the further information soon! Please let me know if you have any query!'
            'Thank You!'
            this.SendJobMail(sub, desc, email);
            this.InsertNotificationRecruiter();
            this.GetJobDescription();
            this.loader = false;
          },
          (error) => {
            this.loader = false;
            console.log('Error', error);
            Swal.fire('Issue in Updating Candidate Registration Accept/Reject');
            // Insert error in Db Here//
            var obj = {
              PageName: this.currentUrl,
              ErrorMessage: error.error.message,
            };
            this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
              (data) => {
                debugger;
              }
            );
          }
        );
      },
    });
  }

  public GetOfferLetter(offer: any) {
    window.open(offer, '_blank');
  }

  public Reject(id: any, shortlistionNotes: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Reject this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.RecruitmentServiceService.UpdateCandidateRegistrationAcceptReject(
          id,
          2,
          shortlistionNotes
        ).subscribe({
          next: (data) => {
            debugger;
            Swal.fire('Rejected!', 'Candidate has been Rejected', 'success');
            location.reload();
            // this.GetCandidateReg()
          },
          error: (err: { error: { message: any } }) => {
            Swal.fire('Issue in Getting Expenses List Web');
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
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
        location.reload();
      }
    });
  }

  public changeoption() {
    debugger;
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: (data) => {
        debugger;
        this.joblist = data.filter(
          (x) =>
            x.accept == 0 &&
            x.reject == 0 &&
            x.noticePeriod == this.searchbynotice
        );
        }, error: (err: { error: { message: any } }) => {
        Swal.fire('Getting Candidate Registration');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: this.err.error.message,
        };
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

  public changectc() {
    debugger;
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: (data) => {
        debugger;
        this.joblist = data.filter(
          (x) => x.accept == 0 && x.reject == 0 && x.ctc == this.searchbyctc
        );
      }, error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting Candidate Registration');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: this.err.error.message,
        };
     
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

  public GetJobRequirements() {
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: (data) => {
        debugger;
        this.joblist = data.filter(
          (x) =>
            x.accept == 0 &&
            x.reject == 0 &&
            x.hiringManager == this.hiringManager
        );
        // this.joblist = data.filter(x => x.accept == 0 && x.reject == 0 && x.hiringManager == this.hiringManager);
        this.count = this.joblist.length;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting Expenses List Web');
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

  public GetJobDescription() {
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
      next: (data) => {
        debugger;
        this.jobdescription = data;
        this.loader = false;
        this.count = this.staffdetails.length;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire(' Issue in Getting  Job Description Master ');
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


  public getjobdescription(even: any) {
    this.jobdescriptionID = even.target.value

    if (this.roleid == '3') {
      debugger;
      this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
        next: (data) => {
          debugger;
          this.dummjoblist = data.filter(
            (x) =>
              x.accept == 0 &&
              x.reject == 0 &&
              x.source == 'Vendor' &&
              x.vendorId == this.userid

          );
          this.joblist = data.filter(
            (x) =>
              x.accept == 0 &&
              x.reject == 0 &&
              x.source == 'Vendor' &&
              x.vendorId == this.userid &&
              x.jobTitle == this.jobdescriptionID

          );
          this.noticeperiodlist = data.filter(
            (x) =>
              x.accept == 0 &&
              x.reject == 0 &&
              x.source == 'Vendor' &&
              x.vendorId == this.userid

          );
          this.ctclist = data.filter(
            (x) =>
              x.accept == 0 &&
              x.reject == 0 &&
              x.source == 'Vendor' &&
              x.vendorId == this.userid
          );

          this.count = this.joblist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire(' Issue in Getting Candidate Registration');
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
    } else if (this.roleid == 2) {
      this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
        next: (data) => {
          debugger;
          this.dummjoblist = data.filter((x) => x.accept == 0 && x.reject == 0);
          this.joblist = data.filter((x) => x.accept == 0 && x.reject == 0 && x.jobTitle == this.jobdescriptionID);
          this.noticeperiodlist = data.filter(
            (x) => x.accept == 0 && x.reject == 0
          );
          this.ctclist = data.filter((x) => x.accept == 0 && x.reject == 0);
          this.count = this.joblist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire(' Issue Getting Candidate Registration');
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
    } else {
      this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
        next: (data) => {
          debugger;
          this.dummjoblist = data.filter((x) => x.accept == 0 && x.reject == 0);
          this.joblist = data.filter((x) => x.accept == 0 && x.reject == 0 && x.jobTitle == this.jobdescriptionID);
          this.noticeperiodlist = data.filter(
            (x) => x.accept == 0 && x.reject == 0
          );
          this.ctclist = data.filter((x) => x.accept == 0 && x.reject == 0);
          this.count = this.joblist.length;

          },error: (err: { error: { message: any } }) => {
            Swal.fire(' Issue in Getting Candidate Registration');
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

  }


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



  public InsertNotificationRecruiter() {
    debugger
    var event: any = 'Resume Shortlisted';
    this.RecruitmentServiceService.InsertNotificationSBU(event, this.recruiter, 'Your Uploaded Resume has been Shortlisted')
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
          )}
      })
  }
}
