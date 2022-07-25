import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-selected-candidates',
  templateUrl: './selected-candidates.component.html',
  styleUrls: ['./selected-candidates.component.css']
})
export class SelectedCandidatesComponent implements OnInit {

  roleid: any
  err: any;

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  DeminimisList: any;
  deminimis: any;
  joblist: any;
  count: any;
  search: any;
  date: any;
  loader: any;
  dummjoblist: any;
  jobListCopy: any;
  joiningbonus: any;
  Notes: any;
  noticeperiodbythen: any;
  searchbynotice: any;
  option: any;
  noticeperiodlist: any;
  p: any = 1;
  count1: any = 5;
  offernotes: any;
  Company_logo: any;
  TentativeDate: any;
  username: any;
  hrlist: any;
  basicsalary: any;
  avgsalofcurrentlevel: any
  currentlevel: any;
  ctc: any;
  netsalary: any;
  currentUrl: any
  staffdetails:any
  Role:any
  data : any
  

  ngOnInit(): void {
    this.GetJobDescription()
    this.Role=""
    this.currentUrl = window.location.href;
    this.searchbynotice = "";
    this.hiringManager = "";
    this.RecruitmentServiceService.GetClientStaff().subscribe({
      next: data => {
        debugger
        this.hrlist = data;

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Client Staff');
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






    this.GetCandidateReg()
    this.roleid = sessionStorage.getItem('roleid');
    this.loader = true;
    this.username = sessionStorage.getItem('UserName');
  }
  dummjoblist1: any;
  public GetCandidateReg() {
    debugger
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2) {
          this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
          this.noticeperiodlist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
          this.count = this.joblist.length;
          this.loader = false;
        }
        else {
          this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
          this.jobListCopy = this.joblist;
          this.dummjoblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
          this.dummjoblist1 = data.filter(x => x.interviewSelected != 1 && x.offered != 0);
          this.noticeperiodlist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
          this.loader = false;
          this.count = this.joblist.length;
        }

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GettingCandidate Registration');
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
  candidateid: any;
  candidatename: any;
  public GetOfferID(id: any, job: any) {
    this.candidateid = id;
    this.candidatename = job.candidateName,
      this.email = job.email
  }
  public GetOfferLetter(offer: any) {
    window.open(offer, "_blank")
  }
  public Filterjobs() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string, jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy) || x.jobTitle.toLowerCase().includes(searchCopy));
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
        this.Company_logo = res;
        Swal.fire("Attachment Uploaded");
      },error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Uploading Images');
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
 public updatedetails() {

    if (this.Company_logo == null || this.Company_logo == undefined || this.Company_logo == 0 ||
      this.offernotes == null || this.offernotes == undefined || this.offernotes == 0 ||
      this.TentativeDate == null || this.TentativeDate == undefined || this.TentativeDate == 0) {
      Swal.fire('Please Fill the Mandatory Fields')
    }

    else {
      debugger;
      var entity = {
        'ID': this.candidateid,
        'OfferLetterUrl': this.Company_logo,
        'OfferNotes': this.offernotes,
        'TentativeDate': this.TentativeDate
      }
      this.RecruitmentServiceService.UpdateOfferLetter(entity).subscribe({
        next: data => {
          debugger
          Swal.fire("Candidate Offered Successfully");
          this.sendmail()
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Updating Offer Letter');
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
      location.reload();
    }
  }
public updatejoiningdate() {
    if (this.date == null || this.date == undefined || this.date == 0 ||
      this.joiningbonus == null || this.joiningbonus == undefined || this.joiningbonus == 0 ||
      this.noticeperiodbythen == null || this.noticeperiodbythen == undefined || this.noticeperiodbythen == 0 ||
      this.Notes == null || this.Notes == undefined || this.Notes == 0) {
      Swal.fire('Please Fill the Mandatory Fields')
    }
    else {
      var entity = {
        'ID': this.candidateid,
        'JoiningDate': this.date,
        'JoiningBonus': this.joiningbonus,
        'NoticePeriodByThen': this.noticeperiodbythen,
        'Comments': this.Notes
      }
      this.RecruitmentServiceService.UpdateCandidateJoiningDate(entity).subscribe({
        next: data => {
          debugger
          Swal.fire("Saved Successfully");
          this.date = "";
          this.joiningbonus = "";
          this
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Updating Candidate JoiningDate');
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

  emailattchementurl = [];
  public email: any;
  public doctorname: any;

  public sendmail() {

    var entity = {
      'emailto': this.email,
      'emailsubject': "Amaze Inc Offer Letter",
      'emailbody': 'Dear ' + this.candidatename + ',' + "<br><br>" + this.offernotes,
      'attachmenturl': this.Company_logo,
      'cclist': 0,
      'bcclist': 0
    }
    this.RecruitmentServiceService.sendemail(entity).subscribe(data => {
      })
  }

  Date: any;
  userid: any;
  endDate:any
  // public GetDate(event:any) {
  //   if(this.Date==0){
  //     debugger
  //     this.RecruitmentServiceService.GetJob_Requirements().subscribe(data => {
  //       this.joblist = data.filter(x => x.recruiter == this.userid);
  //       this.count = this.joblist.length;
  //     })
  //   }
  //   else{
  //     debugger
  //     this.RecruitmentServiceService.GetJob_Requirements().subscribe(data => {
  //       this.joblist = data.filter(x => x.recruiter == this.userid && x.date==this.Date);

  //       this.count = this.joblist.length;
  //     })
  //   }

  // }

  //   public GetDate(event: any) {
  //     if (this.Date == 0) {
  //       debugger
  //       this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {
  //         this.joblist = data;
  //         debugger
  //         this.dummjoblist = data;
  //         this.count = this.joblist.length;
  //       })
  //     }
  //     else {
  //       debugger
  //       this.joblist = this.dummjoblist.filter((x: { date: any; }) => x.date == this.Date);
  //       this.count = this.joblist.length;
  //     }
  //   }


  public changeAnniversary() {
    debugger;

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        // this.joblist = data.filter(x => x.cdate == this.Date + "T00:00:00");
        this.joblist = data.filter((x: { date: any; }) => x.date >= this.Date && x.date <= this.endDate);


      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GettingCandidate Registration');
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
    }) ;
  }

  public changeoption() {
    debugger;

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => (x.interviewSelected == 1 && x.offered == 0) && (x.noticePeriod == this.searchbynotice));

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Candidate Registration');
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
    });
  }

  hiringManager: any;
  public GetJobRequirements() {


    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        let teamexpnes: any = data.filter(x => x.supervisor == sessionStorage.getItem('staffid'));
        this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0 && x.hiringManager == this.hiringManager);

        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Candidate Registration');
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

  GetJobDeminimis() {

  }
  demenisamt: any;


  getid(even: any) {
    debugger
    this.id = even;
    this.RecruitmentServiceService.GetCandidateRegistration()
      .subscribe(data => {
        debugger

        let temp: any = data.filter(x => x.id == this.id);
        this.basicsalary = temp[0].basicsalary;
        this.DeminimisList = temp[0].demenislist;
        this.currentlevel = temp[0].level;
        this.demenisamt = temp[0].demenisamt;
        this.currentlevel = temp[0].level;
        this.netsalary = this.basicsalary + this.demenisamt;
        this.ctc = this.netsalary * 12;
        this.currentlevel = temp[0].level;


      })
  }
  id: any;
  public ApproveId() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Approve it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {

        var entity = {
          "ID": this.id,
          "BudgetStatus": 'Approved',
        }
        this.RecruitmentServiceService.UpdateCanditateBudgetStatus(entity).subscribe({
          next: data => {
            debugger
            Swal.fire('Approved Successfully')
            location.reload();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Updating Canditate Budget Status');
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
    })
  }
  public Reject(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Reject it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        var entity = {
          "ID": ID,
          "BudgetStatus": 'Rejected',
        }
        this.RecruitmentServiceService.UpdateCanditateBudgetStatus(entity).subscribe({
          next: data => {
            debugger
            Swal.fire('Approved Successfully')
            location.reload();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Getting Expenses List Web');
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
    })
  }
 



  jobdescription:any;
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

  jobdescriptionID:any;
  public filterByJD(even:any){
    this.jobdescriptionID=even.target.value

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2) {
          this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0 && x.jobTitle==this.jobdescriptionID );
          this.noticeperiodlist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
          this.count = this.joblist.length;
          this.loader = false;
        }
        else {
          this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0 && x.jobTitle==this.jobdescriptionID );
          this.jobListCopy = this.joblist;
          this.dummjoblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
          this.dummjoblist1 = data.filter(x => x.interviewSelected != 1 && x.offered != 0);
          this.noticeperiodlist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
          this.loader = false;
          this.count = this.joblist.length;
        }

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Candidate Registration');
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
