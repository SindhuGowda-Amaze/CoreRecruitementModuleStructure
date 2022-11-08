import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-offer-management',
  templateUrl: './offer-management.component.html',
  styleUrls: ['./offer-management.component.css']
})
export class OfferManagementComponent implements OnInit {

 
  roleid: any

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }



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
  ngOnInit(): void {
    this.searchbynotice = "";
    this.hiringManager = "";
    this.RecruitmentServiceService.GetClientStaff().subscribe(data => {
      this.hrlist = data;
    })
    this.GetCandidateReg()
    this.roleid = sessionStorage.getItem('roleid');
    this.loader = true;
    this.username = sessionStorage.getItem('UserName');
  }
  dummjoblist1: any;
  public GetCandidateReg() {
    debugger
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {
      if (this.roleid == 2) {
        this.joblist = data.filter(x => x.hiringManager == this.username && x.interviewSelected == 1 && x.offered == 0);
        this.noticeperiodlist = data.filter(x => x.interviewSelected == 1 && x.offered == 0 && x.hiringManager == this.username);
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


  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadattachments() {
    debugger
    this.RecruitmentServiceService.UploadImages(this.files).subscribe(res => {
      debugger
      this.Company_logo = res;
      alert("ATTACHMENT UPLOADED");
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
      this.RecruitmentServiceService.UpdateOfferLetter(entity).subscribe(data => {
        Swal.fire("Candidate Offered Successfully");
        this.sendmail()
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
      this.RecruitmentServiceService.UpdateCandidateJoiningDate(entity).subscribe(data => {
        Swal.fire("Saved Successfully");
        this.date = "";
        this.joiningbonus = "";
        this
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

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {

      this.joblist = data.filter(x => x.cdate == this.Date + "T00:00:00");
    });
  }

  public changeoption() {
    debugger;

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {
      this.joblist = data.filter(x => (x.interviewSelected == 1 && x.offered == 0) && (x.noticePeriod == this.searchbynotice));
    });
  }

  hiringManager: any;
  public GetJobRequirements() {


    this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {
      debugger

      this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0 && x.hiringManager == this.hiringManager);

      this.count = this.joblist.length;


    })

  }

  public ApproveId(data:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Approve it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        if(this.roleid==11){
          var entity = {
            "ID": data,
          
            "Status": 'Manager Approved BU Pending',
          
          }
          this.RecruitmentServiceService.UpdateJobRequirementStatus(entity).subscribe(data => {
            debugger
            Swal.fire('Approved Successfully')
            location.reload();
          })
        }
        else if(this.roleid==10){
          var entity = {
            "ID": data,
            "Status": 'Manager Approved BU Approved',
          
          }
          // this.RecruitmentServiceService.UpdateJobRequirementStatus(entity).subscribe(data => {
          //   debugger
          //   Swal.fire('Approved Successfully')
          //   location.reload();
          // })
        }
       
      
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
            "Status": 'Manager Rejected',
          
          }
          // this.RecruitmentServiceService.UpdateJobRequirementStatus(entity).subscribe(data => {
          //   debugger
          //   Swal.fire('Rejected Successfully')
          //   location.reload();
          // })
        }
      })
    }
}
